const router = require('koa-router')()
const tokenRequired = require('../middleware/token_required')
const AlbumController = require('../controllers/album')

router.get('/', tokenRequired, AlbumController.index)
router.post('/', tokenRequired, AlbumController.create)
router.get('/:id', tokenRequired, AlbumController.show)
router.post('/update', tokenRequired, AlbumController.update)

module.exports = router
