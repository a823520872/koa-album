class PhotoController {
    async upload(ctx) {
        let filePath = ctx.req.file.filename
        let host = ctx.request.header.host
        if (!~host.indexOf('://')) {
            host = 'http://' + host
        }
        filePath = host + '/upload/' + filePath
        ctx.body = {
            code: 1,
            data: filePath
        }
    }
}

module.exports = new PhotoController()
