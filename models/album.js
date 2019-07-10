const mongoose = require('mongoose')
const PhotoSchema = require('./photo')

const AlbumSchema = mongoose.Schema({
    user_id: String,
    photo: [PhotoSchema],
    deleted: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Album', AlbumSchema)
