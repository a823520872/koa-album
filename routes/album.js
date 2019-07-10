const router = require('koa-router')()
const tokenRequired = require('../middleware/token_required')
const AlbumController = require('../controllers/album')

router.get('/', tokenRequired, AlbumController.index)
// router.post('/create', tokenRequired, AlbumController.create)
// router.post('/update', tokenRequired, AlbumController.update)

module.exports = router
