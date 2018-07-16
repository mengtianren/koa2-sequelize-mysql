const Router = require("koa-router")
const router = new Router()
const multer = require('koa-multer');//加载koa-multer模块
//文件上传
var storage = multer.diskStorage({
    //文件保存路径
    destination:  (req, file, cb) => {
        cb(null, 'public/image/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });
//路由
router.post('/upload', upload.single('file'), async (ctx, next) => {
    console.log(ctx)
    try{
        ctx.body = {
            code : 1,
            message : '文件上传成功',
            filepath : `${ctx.host}/image/${ctx.req.file.filename}`//返回文件名
        }
    }catch (e) {
        ctx.body = {
            code : 0,
            message : '文件不存在',
            filepath : ''
        }
    }

})
    .get('*',async (ctx) =>{
        ctx.body = '欢迎使用本api。'
    })



module.exports = router
