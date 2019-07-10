const router = require('koa-router')()
const WXController = require('../controllers/wx.js')
const tokenRequired = require('../middleware/token_required')

router.get('/login', WXController.login)
router.post('/signUp', tokenRequired, WXController.signUp)

module.exports = router
