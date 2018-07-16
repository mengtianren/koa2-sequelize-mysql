const { Blog, User }  = require('../db/db')
const {Utils} = require('../utils/utils')


class BlogOperation {

    async addBlog (ctx) {
        let query = ctx.request.query
        let session = ctx.session.user
        if(!session) ctx.error('用户未登录')
        if(!query.title||!query.content) ctx.error('title或content字段未完善')

        try {
            let blog = await Blog.create({
                title : query.title,
                content : query.content,
                user_id : session.id
            })
            ctx.success('添加文章成功',blog)
        }catch (e) {
            ctx.error(Utils.ErrorE(e))
            }
    }
    async listBlog (ctx) {
        try {
            let list = await Blog.findAll({
                attributes: ['id', 'title', 'content', 'watch_num'],
                include : {
                    model:User,
                    attributes:{exclude :['password','is_admin']}
                }
            })
            ctx.success('获取列表成功',list)
        }catch (e) {
            ctx.error(Utils.ErrorE(e))
        }

    }
    async detailBlog (ctx) {
        console.log(ctx)
        let query = ctx.request.query
        if(!query.id) ctx.error('缺少id字段')
        console.log(query)
        try {
            let detail = await Blog.findById(query.id,{
                include : {
                    model : User,
                    attributes : {
                        exclude : ['password','is_admin']
                    }
                }
            })
            await detail.increment('watch_num')
            ctx.success('获取详情成功',detail)
        }catch (e) {
            ctx.error(Utils.ErrorE(e))
        }
    }
}

module.exports.BlogOperation = new BlogOperation()
