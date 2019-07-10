const Album = require('../models/album')

class AlbumService {
    async findOne(params) {
        return await Album.findOne(params)
    }
    async create(params) {
        return await Album.create(params)
    }
    async updateOne(values, params) {
        return await Album.updateOne(values, params)
    }
    async destroy(values, params) {
        return await Album.updateOne(values, params)
    }
}

module.exports = new AlbumService()
