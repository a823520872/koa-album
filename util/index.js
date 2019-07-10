const fs = require('fs')
const path = require('path')
const axios = require('axios')
const crypto = require('./crypto')
const imageInfo = require('./imageInfo')

const utils = {
    curl(uri, params) {
        let defaultParams = { method: 'GET' }
        let p = { url: uri, defaultParams, ...params }
        return axios(p).then(res => res.data)
        // return axios.get(uri).then(res => res.data)
    },
    download(uri) {
        return new Promise((resolve, reject) => {
            let md5 = crypto.getMd5(uri)
            let filepath = path.join(__dirname, '../public/avatar')
            if (!fs.existsSync(filepath)) {
                fs.mkdirSync(filepath)
            }
            const downloadFile = path.resolve(filepath, md5)
            const writer = fs.createWriteStream(downloadFile)
            this.curl(uri, {
                responseType: 'stream'
            }).then(res => {
                res.pipe(writer)
                writer.on('finish', res => {
                    let fileData = fs.readFileSync(downloadFile)
                    let info = imageInfo(fileData)
                    fs.renameSync(downloadFile, path.resolve(filepath, md5 + '.' + info.format.toLowerCase()))
                    resolve()
                })
                writer.on('error', reject)
            })
            // axios({
            //     url: uri,
            //     method: 'GET',
            //     responseType: 'stream'
            // }).then(res => {
            //     res.data.pipe(writer)
            //     writer.on('finish', resolve)
            //     writer.on('error', reject)
            // })
        })
    }
}

module.exports = utils
