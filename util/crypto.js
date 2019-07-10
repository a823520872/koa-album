const crypto = require('crypto')
// const pwd = '2019'

let Hash = {
    hashEncode(str) {
        let bc = Buffer.from(str)
        return bc.toString('base64')
        // const cipher = crypto.createCipher('aes192', pwd)
        // let h = cipher.update(str, 'utf-8', 'hex')
        // h += cipher.final('hex')
        // return h
    },
    hashDecode(str) {
        let bc = Buffer.from(str, 'base64')
        return bc.toString()
        // const cipher = crypto.createDecipher('aes192', pwd)
        // let h = cipher.update(str, 'hex', 'utf-8')
        // h += cipher.final('utf-8')
        // return h
    },
    getMd5(str) {
        const md5 = crypto.createHash('md5')
        md5.update(str)
        return md5.digest('hex')
    }
}

module.exports = Hash
