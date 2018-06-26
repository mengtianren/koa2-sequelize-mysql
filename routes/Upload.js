const Router = require("koa-router")
const router = new Router()
const fs = require('fs')
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
    console.log(ctx.req.file)
    if(ctx.req.file){
        ctx.body = {
            code : 1,
            message : '文件上传成功',
            filepath: `${ctx.host}/image/${ctx.req.file.filename}`//返回文件名
        }
    }else{
        ctx.body = {
            code : 0,
            message : '文件不存在',
            filepath : ''
        }
    }

})



module.exports = router
