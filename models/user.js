const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    openid: String,
    session_key: String,
    name: { type: String, default: '' },
    avatar: { type: String, default: '' },
    created: Date,
    lastLogin: {
        type: Date,
        default: Date.now
    },
    token: String
})

module.exports = mongoose.model('User', UserSchema)
