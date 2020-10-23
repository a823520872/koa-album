const route = require('koa-router')()
const wx = require('./wx')
const user = require('./user')
const album = require('./album')
const photo = require('./photo')

route.use('/wx', wx.routes()).use(wx.allowedMethods())
route.use('/user', user.routes()).use(user.allowedMethods())
route.use('/album', album.routes()).use(album.allowedMethods())
route.use('/photo', photo.routes()).use(photo.allowedMethods())

module.exports = route
