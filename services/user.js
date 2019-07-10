const User = require('../models/user')

class UserService {
    async findOne(params) {
        return await User.findOne(params)
    }
    async create(params) {
        return await User.create(params)
    }
    async updateOne(values, params) {
        return await User.updateOne(values, params)
    }
}

module.exports = new UserService()
