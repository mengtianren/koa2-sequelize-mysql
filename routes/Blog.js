const {BlogOperation} = require('../controller/Blog')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/blog'
})
/**
 * @params : {name, password, icon, is_admin}
 * @return : {code, message,data}
 */
router.post('/add',async ctx => await BlogOperation.addBlog(ctx))
router.get('/list',async ctx => await BlogOperation.listBlog(ctx))
router.get('/detail',async ctx => await BlogOperation.detailBlog(ctx))

module.exports = router
