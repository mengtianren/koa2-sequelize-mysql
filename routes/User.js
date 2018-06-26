const {UserOperation} = require('../controller/User')
const Router = require('koa-router')
const router = new Router({
    prefix: '/api/v1/user'
})
/**
 * @params : {name, password, icon, is_admin}
 * @return : {code, message,data}
 */
router
    .post('/register',async ctx => await UserOperation.register(ctx))
    .post('/login',async ctx => await UserOperation.login(ctx))
    .get('/list',async ctx => await UserOperation.list(ctx))
    .get('/detail',async ctx => await UserOperation.detail(ctx))
    .post('/set',async ctx => await UserOperation.setUser(ctx))
    .get('/loginout',async ctx => await UserOperation.loginOut(ctx))

module.exports = router
