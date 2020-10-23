const fs = require('fs')
const util = require('util')
const path = require('path')
const axios = require('axios')
const moment = require('moment')
const crypto = require('./crypto')
const imageInfo = require('./imageInfo')

const utils = {
    curl(uri, params = {}) {
        let defaultParams = { method: 'GET' }
        let p = Object.assign({url: uri, defaultParams}, params)
        return axios(p).then(res => res.data)
    },
    download(uri) {
        return new Promise((resolve, reject) => {
            this.mkdir('public/avatar/' + moment().format('YYYYMMDD')).then(filePath => {
                console.log(filePath);
                let md5 = crypto.getMd5(uri)
                try {
                    let downloadFile = path.resolve(__dirname, './'+filePath + '/' +md5)
                    console.log(downloadFile);
                    let writer = fs.createWriteStream(downloadFile)
                    this.curl(uri, {
                        responseType: 'stream'
                    }).then(res => {
                        res.pipe(writer)
                        writer.on('finish', res => {
                            let fileData = fs.readFileSync(downloadFile)
                            let info = imageInfo(fileData)
                            let name = md5 + '.' + info.format.toLowerCase()
                            let newPath = path.resolve(filePath, name)
                            fs.renameSync(downloadFile, newPath)
                            resolve(name)
                        })
                        writer.on('error', reject)
                    })
                } catch (error) {
                    console.log(error);
                }
            })
        })
    },
    mkdir(filePath) {
        return new Promise((resolve, reject) => {
            util.promisify(fs.existsSync)(filePath).then(() => {
                resolve(filePath)
            }, () => {
                util.promisify(fs.mkdir)(filePath).then(() => {
                    resolve(filePath)
                }, reject)
            })
            // let isExists = fs.existsSync(filePath)
            // if (!isExists) {
            //     util.promisify(fs.mkdir)(filePath).then(() => {
            //         resolve(filePath)
            //     }, reject)
            // } else {
            //     resolve(filePath)
            // }
        })
    }
}

module.exports = utils
