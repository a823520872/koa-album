const WXService = require('../services/wx')

const _ = require('lodash')

class UserController {
    async show(ctx) {
        let { user } = ctx.request
        console.log(user)
        ctx.body = {
            code: 1,
            data: _.pick(user, 'name', 'avatar', 'created', 'lastLogin')
        }
    }
}

module.exports = new UserController()
