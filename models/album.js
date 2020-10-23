const mongoose = require('mongoose')
// const PhotoSchema = require('./photo')

const AlbumSchema = mongoose.Schema({
    user_id: String,
    name: String,
    photos: [String],
    private: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: null
    },
    deleted: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Album', AlbumSchema)
