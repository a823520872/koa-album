const Album = require('../models/album')

class AlbumService {
    find(params) {
        return Album.find(params)
    }
    findOne(params) {
        return Album.findOne(params)
    }
    findById(id) {
        return Album.findById(id)
    }
    create(params) {
        return Album.create(params)
    }
    updateOne(values, params) {
        return Album.updateOne(values, params)
    }
    destroy(values, params) {
        return Album.updateOne(values, params)
    }
}

module.exports = new AlbumService()
