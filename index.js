const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const mongoose = require('mongoose')
const logger = require('koa-logger')
const Moment = require('moment')

const app = new Koa()
const routes = require('./routes')
const config = require('./config')

app.use(
    logger(str => {
        // 使用日志中间件
        console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str)
    })
)
app.use(static(path.join(__dirname, './public')))
app.use(bodyparser())
app.use(routes.routes()).use(routes.allowedMethods())

function listen() {
    console.log('listen')
    app.listen(8888, () => {
        console.log(`正在监听8888端口`)
    })
}

function connect() {
    console.log('connect')
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen)
    return mongoose.connect(config.db, { keepAlive: 1, useNewUrlParser: true })
}

connect()
