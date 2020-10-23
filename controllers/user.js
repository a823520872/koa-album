const WXService = require('../services/wx')
const WXBizDataCrypt = require('../util/WXBizDataCrypt')
const UserService = require('../services/user')
const appId = require('../config').AppID

const _ = require('lodash')

class UserController {
    async show(ctx) {
        let { header, user } = ctx.request
        if (user && user.avatar) {
            let host = ctx.request.header.host
            if (!~host.indexOf('://')) {
                host = 'http://' + host
            }
            user.avatar = host + '/avatar/' + user.avatar
        }
        ctx.body = {
            code: 1,
            data: _.pick(user, 'name', 'avatar', 'created', 'lastLogin')
        }
    }
    async signUp(ctx) {
        try {
            let {
                user,
                body: { encryptedData, iv }
            } = ctx.request
            let pc = new WXBizDataCrypt(appId, user.session_key)
            let newUser = pc.decryptData(encryptedData, iv)
            let { nickName, avatarUrl } = newUser
            let avatar = await WXService.upload(avatarUrl)
            await UserService.updateOne({ openid: user.openid }, { name: nickName, avatar })
            let wx = await WXService.findOne({ openid: user.openid })
            if (!wx) {
                await WXService.create({ ...newUser, avatarUrl: avatar, openid: user.openid })
            }
            ctx.body = {
                code: 1,
                data: null
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.toString()
            }
        }
    }
}

module.exports = new UserController()
