class PhotoController {
    async upload(ctx) {
        console.log(ctx.request.body)
        ctx.body = {
            code: 1,
            data: ctx.req.file.filename
        }
    }
}

module.exports = new PhotoController()
