const { AppID, AppSecret } = require('../config')
const util = require('../util')
const WX = require('../models/wx')

class WXService {
    async auth(code) {
        let uri = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`
        try {
            let response = await util.curl(uri)
            if (!response.errcode) {
                return response
            } else if (response.errcode === 40029) {
                throw new Error('invalid code')
            } else if (response.errcode === -1) {
                throw new Error('系统繁忙')
            } else if (response.errcode === 45011) {
                throw new Error('系统繁忙，请稍后再试')
            }
        } catch (error) {
            return error
        }
    }
    async upload(uri) {
        return await util.download(uri)
    }
    async findOne(params) {
        return await WX.findOne(params)
    }
    async create(params) {
        return await WX.create(params)
    }
}

module.exports = new WXService()
