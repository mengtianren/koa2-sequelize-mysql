const crypto = require("crypto");

const { User,Blog }  = require('../db/db')
const {Utils} = require('../utils/utils')


class UserOperation {

    async register (ctx) {
         let query = ctx.request.query
         if(!query.phone || !query.password) ctx.error('缺少用户名或密码字段')
         try {
             let md5 = crypto.createHash("md5");
             query.password = await md5.update(query.password).digest("hex");
            await User.create({
                phone : query.phone,
                password : query.password,
                icon : query.icon,
                is_admin : 0 || query.is_admin  //判断是否为管理员
            })
             ctx.success('创建成功',{})
         }catch (e) {
             ctx.error(Utils.ErrorE(e))
         }
    }
    async login (ctx) {
        let query = ctx.request.query
        if(!query.phone || !query.password) ctx.error('缺少用户名或密码字段')
        let md5 = crypto.createHash("md5");
        query.password = await md5.update(query.password).digest("hex");
       try {
           let user = await User.find({
               where: {
                   phone : query.phone,
                   password : query.password
               },
               attributes:{
                   exclude : ['password']
               }
           })
           ctx.session.user = user
           console.log(user,'== ==')
           user
               ? ctx.success('登录成功',user)
               : ctx.error('No cell phone number or password error')

       }catch (e) {
           ctx.error(Utils.ErrorE(e))
       }
    }
    async loginOut (ctx) {
        ctx.session = null
        ctx.success('已成功退出!', {})
    }
    async list (ctx) {
        console.log(ctx)
        let session = ctx.session.user
        console.log(session)
        if(!session||!session.is_admin) ctx.error('您没有查看权限')
        try {
            let lists = await User.findAll({
                where:{},  //搜索条件
                attributes : {   //展示条件 include 要展示的字段 / exclude 要隐藏的字段
                    exclude : ['password','is_admin']
                },
                include : {
                    model : Blog ,  //关联blog表
                    attributes :{
                        exclude :['user_id']
                    }
                }
            })
           ctx.success('获取列表成功',lists)
        }catch (e) {
            ctx.error(Utils.ErrorE(e))
        }
    }
    async detail (ctx) {
        let query = ctx.request.query
        if(!query.id) ctx.error('缺少id字段')
        try {
            let detail = await User.findById(query.id,{
                attributes : {
                    exclude : ['password','is_admin']
                },
                include : {
                    model : Blog,
                    attributes : {
                        exclude: ['user_id']
                    }
                }
            })
            console.log(detail)
            detail
                ? ctx.success('获取用户信息成功',detail)
                : ctx.error('user does not exist')

        }catch (e) {
            ctx.error(Utils.ErrorE(e))
        }

    }
    async setUser (ctx){
        let query = ctx.request.query
        let session = ctx.session.user
        console.log(session)
        if(!session) ctx.error('用户未登录')
        try {
            await User.update({
                name : query.name || session.name,
                email : query.email || session.email,
                icon : query.icon || session.icon
            },{
                where : {
                    id : session.id
                }
            })
           let user = await User.findById(session.id,{
               attributes : {
                   exclude: ['password']
               }
           })
            ctx.session.user = user
            ctx.success('修改成功',user)
        }catch (e) {
           ctx.error(Utils.ErrorE(e))
        }
    }
}
module.exports.UserOperation = new UserOperation()
