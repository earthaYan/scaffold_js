const program = require('commander')
const chalk = require('chalk')
const Inquirer = require('inquirer')
const figlet=require('figlet')

program.name('sun').usage(`<command>[option]`).version('1.0.0')
program.command('create <project-name>') //添加create指令
.description('create a new project')//添加指令描述
.option('-f,--force','overwrite target dir if it exists')//强制覆盖
.action((projectName,cmd)=>{
    // 处理用户输入create 指令附加的参数
    console.log(projectName,cmd)
    require('./lib/create')(projectName,cmd)
})

program.parse(process.argv)