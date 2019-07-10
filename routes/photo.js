const router = require('koa-router')()
const PhotoController = require()
const tokenRequired = require('../middleware/token_required')
const upload = require('../middleware/upload')

router.post('/upload', tokenRequired, upload.single('file'), PhotoController.upload)

module.exports = router
