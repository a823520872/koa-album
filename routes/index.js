const route = require('koa-router')()
const api = require('./api')

route.use('/api', api.routes()).use(api.allowedMethods())

module.exports = route
