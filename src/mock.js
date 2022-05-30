const Mock = require('mockjs')

const Random = Mock.Random
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}


/**
 * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL，
 * post/get 需要拦截的 Ajax 请求类型
 *
 * 用于生成响应数据的函数
 */
//获取验证码图片base64编码以及一个随机码
Mock.mock('/captcha','get',() => {
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage("120x40","11111")
    }
    return Result
})

Mock.mock(RegExp('/login*'),'post',(config) => {
    // 这里无法在header添加authorization，直接跳过
   console.log("mock----------------login")
   return Result
})