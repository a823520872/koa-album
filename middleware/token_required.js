const UserService = require('../services/user')

module.exports = async (ctx, next) => {
    let token = ctx.headers.token || ''
    let user = await UserService.findOne({ token })

    if (!user) {
        ctx.body = {
            code: -1,
            msg: '请先登录'
        }
        return
    }
    ctx.request.user = user
    await next()
}
