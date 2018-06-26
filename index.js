const Koa = require('koa')
const logger = require('koa-logger')
// const onerror = require('koa-error')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const User = require('./routes/User')
const Blog = require('./routes/Blog')
const Upload = require('./routes/Upload')
app.use( async (ctx,next) =>{
    try {
        ctx.success = (message, data) => {
            ctx.body = { code:1, message:message || '请求成功', data}
        }
        ctx.error = (code, message) => {
            if (typeof code === 'string') {
                message = code;
                code = 500;
            }
            ctx.throw(code || 500, message || '服务器错误');
        };
        await next();
    } catch (e) {
        let message = e.message || '服务器错误';
        ctx.body = { code:0, message };

    }
})
app.keys = ['blog']
const sessionConfig = {
    httpOnly: true, //*cookie数据是js否能操作 true为不能操作 false为能
    signed: true, //如果为true 则加密base64 防止数据被更改
    rolling: false, // 涉及cookie更新
    renew: false,// 涉及cookie更新
};

app.use(require('koa-static')(__dirname + '/public'))  //设置静态文件默认地址 以供读取
app.use(logger())   //打印日志
app.use(bodyParser())  //解析post数据
// onerror(app)        //错误信息
app.use(session(sessionConfig,app))

app.use(User.routes()) //加载路由
app.use(Blog.routes()) //加载路由
app.use(Upload.routes()) //上传图片
app.listen(8081)   //监听端口
console.log(`http://127.0.01:8081`)


