const Sequelize = require('sequelize')

const sequelize = require('./config')

const Blog = sequelize.define('blog',{
    title : {
        type : Sequelize.STRING(30),
        defaultValue : 'this is title',
        allowNull : false,
        comment : '这里是文章的标题~~~'
    },
    content : {
        type : Sequelize.TEXT,
        allowNull : false,
        defaultValue : '这是文章的内容~~~~~~',
        comment : '这是文章的内容~~~~~'
    },
    watch_num : {
        type : Sequelize.BIGINT,
        defaultValue : 0,
        comment : '这里是观看人数'
    }
},{
    timestamps : true,  //时间更新
    freezeTableName: true, //不加s
})

module.exports = {
    Blog
}
