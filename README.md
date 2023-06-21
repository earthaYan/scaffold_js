## 项目构建
1. 初始化项目 `npm init`
2. 创建入口文件 /bin/entry,指明文件的入口
3. 创建/index.js文件
4. 在 package.json中配置`"bin": "bin/entry"`
5. 执行`npm link`,link到全局
6. 执行`npm install commander@9.0.0`安装依赖commander


## 脚手架的两种做法
1. 托管到github 
  - 代码体积较小
  - 可以选择tag
2. 本地新建一个template模板工程，代码存在本地
  - 代码体积较大
  - 不可以选择tag


## 从github拉取代码
第三方库：download-git-repo