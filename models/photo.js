const mongoose = require('mongoose')

const PhotoSchema = mongoose.Schema({
    user_id: String,
    path: String,
    album_id: mongoose.Schema.Types.ObjectId,
    deleted: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Photo', PhotoSchema)
