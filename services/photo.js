const Photo = require('../models/photo')

class PhotoService {
    async findOne(params) {
        return await Photo.findOne(params)
    }
    async create(params) {
        return await Photo.create(params)
    }
    async updateOne(values, params) {
        return await Photo.updateOne(values, params)
    }
    async destroy(values, params) {
        return await Photo.updateOne(values, params)
    }
}

module.exports = new PhotoService()
