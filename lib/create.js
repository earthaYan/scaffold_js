const path = require('path')
const fs = require('fs-extra')
const Inquirer = require('inquirer')
const loading = require('./util')
const Creator = require('./creator')
module.exports = async function (projectName, options) {
  // 获取当前目录
  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)
  // 如果当前已存在同名目录
  if (fs.existsSync(targetDir)) {
    if (!!options.force) {
      // 使用的--force 强制执行参数
      // 删除重名目录
      await fs.remove(targetDir)
    } else {
      // 未使用--force:是否重写同名目录
      let { isOverwrite } = await new Inquirer.prompt([
        {
          name: "isOverwrite",//与返回值对应
          type: 'list',
          message: 'target dir exists,please choose an action',
          choices: [
            { name: 'Overwrite', value: true },
            { name: 'Cancel', value: false },
          ]
        }
      ])
      // 不重写
      if (!isOverwrite) {
        console.log('cancel')
        return
      } else {
        // 重写
        await loading(`Removing ${projectName} ,please wait a moment`, fs.remove, targetDir)
      }
    }
  }
  // 创建项目
  const creator = new Creator(projectName, targetDir)
  creator.create()
}