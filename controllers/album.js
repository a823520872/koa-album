const AlbumService = require('../services/album')
// const PhotoService = require('../services/photo')
const _ = require('lodash')

class AlbumController {
    async index(ctx) {
        try {
            let {
                user: { openid }
            } = ctx.request
            let albums = await AlbumService.find({
                user_id: openid
            })
            albums = albums.map(album => {
                album.photos = album.photos.map(photo => photoAddHost(photo, ctx, 'add'))
                return pickAlbum(album)
            })
            ctx.body = {
                code: 1,
                data: albums
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.toString()
            }
        }
    }
    async create(ctx) {
        try {
            let {
                user: { openid },
                body: album
            } = ctx.request
            album.user_id = openid
            album.photos = album.photos.map(photo => photoAddHost(photo, ctx, 'sub'))
            await AlbumService.create(album)
            ctx.body = {
                code: 1,
                data: null
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.toString()
            }
        }
    }
    async show(ctx) {
        try {
            let { id } = ctx.params
            let album = await AlbumService.findById(id)
            album.photos = album.photos.map(photo => photoAddHost(photo, ctx, 'add'))
            album = pickAlbum(album)
            ctx.body = {
                code: 1,
                data: album
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.toString()
            }
        }
    }
    async update(ctx) {
        try {
            let {
                user: { openid },
                body: album
            } = ctx.request
            album.photos = album.photos.map(photo => photoAddHost(photo, ctx, 'sub'))
            delete album.id
            await AlbumService.updateOne({ _id: album.id }, album)
            ctx.body = {
                code: 1,
                data: null
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: error.toString()
            }
        }
    }
}

function pickAlbum(album) {
    album.id = album._id
    return _.pick(album, 'id', 'name', 'photos', 'private')
}

function photoAddHost(photo, ctx, action) {
    let host = ctx.request.header.host
    if (!~host.indexOf('://')) {
        host = 'http://' + host
    }
    host += '/upload/'
    return action === 'add'
        ? host + photo
        : photo.replace(host, '')
}

module.exports = new AlbumController()
