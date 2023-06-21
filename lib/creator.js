const downloadGitRepo = require('gitee-repo')
const util = require('util');
const path = require('path')
const { loading } = require('./util')
const { getTagsByRepo, getZhuRongRepo } = require('./api')
const chalk = require('chalk')
const Inquirer = require('inquirer')
class Creator {
  constructor(name, target) {
    this.name = name
    this.target = target
    // 转化为promise方法
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }
  // 创建项目
  async create() {
    // 仓库信息——模板信息
    let repo = await this.getRepoInfo()
    // 标签信息——版本信息
    let tag = await this.getTagInfo(repo)
    // 下载模板
    await this.download(repo, tag)
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n cd ${chalk.cyan(this.name)}`)
    console.log(' npm install')
    console.log(' npm run serve\r\n')
  }
  async getRepoInfo() {
    // 获取组织下的仓库信息
    let repoList = await loading('waiting for fetching template', getZhuRongRepo)
    if (!repoList) return
    // 提取仓库名
    const repoNames = repoList.map(item => item.name)
    // 选取模板信息
    let { repo } = await new Inquirer.prompt([{
      name: 'repo',
      type: 'list',
      message: 'pls choose a template for creating project',
      choices: repoNames
    }])
    return repo
  }
  async getTagInfo(repo) {
    // 获取tag信息
    let tagList = await loading('waiting for fetching version', getTagsByRepo, repo)
    if (!tagList) return
    const tagNames = tagList.map(item => item.name)
    let { tag } = await new Inquirer.prompt([{
      name: 'tag',
      type: 'list',
      message: 'pls choose version for creating project',
      choices: tagNames
    }])
    return tag
  }
  async download(repo, tag) {
    // 模板下载地址
    const templateUrl = `gitee:wanghy07/${repo}${tag ? ("#" + tag) : ""}`
    // 调用downloadGitRepo方法将对应模板下载到指定目录
    await loading(
      "downloading template,pls wait",
      this.downloadGitRepo,
      templateUrl,
      path.resolve(process.cwd(), this.target) //项目创建位置
    )
  }
}
module.exports = Creator