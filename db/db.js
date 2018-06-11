
const { User } = require('./User')
const { Blog } = require('./Blog')



User.hasMany(Blog)         //用户关联文章 User.find( include : {model : Blog})
Blog.belongsTo(User)    //添加文章的时候关联用户信息 Blog.find( include : {model : User})
//启动时是否删除重复的表并重新添加
User.sync({force: false}).then(() => {
    Blog.sync({force: false})
})


module.exports = {
    User,Blog
}
