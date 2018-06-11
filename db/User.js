const Sequelize = require('sequelize')
const sequelize = require('./config')

const User = sequelize.define('user',{
    name : {
        type : Sequelize.STRING,  //定义字段类型
        // field : 'name',     //数据库名称
        defaultValue : '默认昵称',
        comment : '这是用户名称 必传字段',// 解释说明
    },
    phone : {
        unique : true,
        type : Sequelize.STRING,
        allowNull : false,
        comment : '这是用户登录手机号 必传字段',// 解释说明
        validate : {
            isNumeric: true, //判断是否为数字
            is : /^[1][3,4,5,7,8][0-9]{9}$/  //判断正则是否为十一位
        }
    },
    email : {
        type : Sequelize.STRING,
        comment : '这是邮箱',// 解释说明
        validate : {
            isEmail : true
        }
    },
    icon : {
        type : Sequelize.STRING,
        defaultValue: 'https://sfault-avatar.b0.upaiyun.com/355/703/3557037817-575d49e236f70_big64',
        comment : '这是用户头像',
        validate : {
            isUrl: true,
        }
    },
    is_admin : {
        type : Sequelize.BOOLEAN,
        defaultValue : false,
        comment : '判断是否为管理员字段'
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        comment : '用户密码 必传字段'
    }
},{
    timestamps : true,  //时间更新
    freezeTableName: true, //不加s
})
module.exports = {
    User
}
