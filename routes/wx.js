const router = require('koa-router')()
const WXController = require('../controllers/wx.js')
const tokenRequired = require('../middleware/token_required')

router.get('/auth', WXController.auth)
router.post('/signup', tokenRequired, WXController.signUp)

module.exports = router
