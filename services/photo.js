const Photo = require('../models/photo')

class PhotoService {
    findOne(params) {
        return Photo.findOne(params)
    }
    create(params) {
        return Photo.create(params)
    }
    updateOne(values, params) {
        return Photo.updateOne(values, params)
    }
    destroy(values, params) {
        return Photo.updateOne(values, params)
    }
}

module.exports = new PhotoService()
