const router = require('koa-router')()
const UserController = require('../controllers/user.js')
const tokenRequired = require('../middleware/token_required')

router.get('/profile', tokenRequired, UserController.show)

module.exports = router
