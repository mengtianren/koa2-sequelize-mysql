const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodesql',  {
    host : "119.23.60.174",
    port : 3306,
    dialect : 'mysql',  //声明数据库类型
    define : {
        underscored: true // 字段以下划线来分割,默认是驼峰命名风格
    }
})
module.exports = sequelize
