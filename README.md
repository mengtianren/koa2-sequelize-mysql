# koa2-sequelize-mysql

# 这是一个koa+sequelize 操作mysql的一个api接口demo
* -koa api框架
* -koa-router 路由模块
* -koa-logger 打印错误模块
* -koa-session 生成用户session文件
* -koa-koa-bodyparser 解析post数据文件
* -sequelize 操作数据库文件,由于本次使用的是mysql数据库，所以依赖mysql2模块
* 下载完成之后使用npm或者yarn安装依赖
* 修改db文件夹里面config文件里面数据库配置 默认链接本机mysql数据库


# 接口地址：

* -用户注册 POST : http://127.0.0.1:8081/api/v1/user/register  --params : {phone, password, *icon, *is_admin}
* -用户登录 POST : http://127.0.0.1:8081/api/v1/user/login   --params : {phone, password}
* -用户列表 GET : http://127.0.0.1:8081/api/v1/user/list  --params : 无  {只有用户登陆后，并且为管理员权限时候才能访问}
* -用户详情 GET : http://127.0.0.1:8081/api/v1/user/detail  --params : {id}
* -资料修改 POST : http://127.0.0.1:8081/api/v1/user/set  --params : {name, email, icon}{只有登录之后才能修改}
* -用户退出 GET : http://127.0.0.1:8081/api/v1/user/loginout



* -文章列表 GET : http://127.0.0.1:8081/api/v1/blog/list  --params : 无
* -文章添加 POST : http://127.0.0.1:8081/api/v1/blog/add  --params : {title, content} {必须为登录后才能添加}
* -文章详情 GET : http://127.0.0.1:8081/api/v1/blog/detail --params : {id}

* -上传接口 POST : http://127.0.0.1:8081/upload  需要修改头部信息上传图片 --file 文件

# 后续接口开发中。。。。。

