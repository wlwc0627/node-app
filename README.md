# node-app
使用nodejs+vue-cli2.0开发后台管理系统

#创建线上的mongoDB数据库，并将其存储在专有文件 config/keys.js 中
 使用 require('(相对路径)/conifg/keys').mongoURI 即可引用该数据库

 根目录下新建 router/api 两层文件夹
 api 目录下新建文件 user.js 用于存放用户登录(login)和注册(register)的内容
 将 user.js 中的内容输入完成之后，并在 server.js 中引入

 根目录创建模型(model)文件夹，用于存储对应的数据
   创建 User.js 文件

# 使用 body-parser 中间件时，需要将其中间件代码存放在连接数据库之前！！！

 使用 bcrypt 插件来加密注册密码和校验登录时密码的确认

 使用插件 bcrypt 来实现用户默认头像的加载

 插件 jwt(jsonwebtoken) 的用法：jwt("规则","加密名字","过期时间","箭头函数")；具体用法可参见文档(https://www.npmjs.com/package/jsonwebtoken)
 每次登录成功都会返回一个 token 值

 创建商品信息添加接口，该接口是一个私有接口，需验证 token
