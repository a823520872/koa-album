const WXService = require('../services/wx')
const UserService = require('../services/user')
const crypto = require('../util/crypto')
const WXBizDataCrypt = require('../util/WXBizDataCrypt')
const appId = require('../config').AppID
// const _ = require('lodash')

class WXController {
    async login(ctx) {
        let { code } = ctx.query
        try {
            let { session_key, openid } = await WXService.auth(code)
            let token = crypto.hashEncode(session_key)
            let user = await UserService.findOne({ openid })
            if (user) {
                await UserService.updateOne({ openid }, { openid, session_key, token })
            } else {
                await UserService.create({ openid, session_key, token, created: Date.now() })
            }
            ctx.body = {
                code: 1,
                data: {
                    token
                }
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.toString()
            }
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

module.exports = new WXController()
