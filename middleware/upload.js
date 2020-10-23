const fs = require('fs')
const path = require('path')
const multer = require('koa-multer')
const moment = require('moment')
const util = require('../util')
var storage = multer.diskStorage({
    //文件保存路径
    destination: function(req, file, cb) {
        util.mkdir('public/upload/' + moment().format('YYYYMMDD')).then(filePath => {
            console.log(filePath);
            cb(null, filePath)
        })
    },
    //修改文件名称
    filename: function(req, file, cb) {
        var fileFormat = file.originalname.split('.') //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + '_' + Math.round(Math.random() * 1000) + '.' + fileFormat[fileFormat.length - 1])
    }
})
//加载配置
var upload = multer({ storage })

module.exports = upload
