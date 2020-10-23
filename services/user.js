const User = require('../models/user')

class UserService {
    findOne(params) {
        return User.findOne(params)
    }
    create(params) {
        return User.create(params)
    }
    updateOne(values, params) {
        return User.updateOne(values, params)
    }
}

module.exports = new UserService()
