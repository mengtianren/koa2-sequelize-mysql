
class Utils {

    ErrorE (e){
        // console.log(e,'-------------------------------')
        console.log(e.message,'-------------------------------')
        switch (e.message){
            case 'Validation error':
               console.log('用户已经被注册')
                return '用户已经被注册'
                break;
            case 'Validation error: Validation is on phone failed':
                console.log('请输入11位手机号')
                return '请输入11位手机号'
                break;
            case 'No cell phone number or password error':
                console.log('手机号不存在或密码错误')
                return '手机号不存在或密码错误'
                break;
            case 'user does not exist':
                console.log('用户不存在')
                return '用户不存在'
                break;
            case 'Validation error: Validation isEmail on email failed':
                console.log('邮箱格式错误')
                return '邮箱格式错误'
                break;
            default:
                console.log('服务器异常')
                return '服务器异常'
        }
    }
}
module.exports.Utils = new Utils()
