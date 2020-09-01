let jwt = require('jsonwebtoken')

const generateToken = (data, cb) => {
    jwt.sign(data, 'takut123', (err, data) => {
        if (err) cb(err)
        else cb(null, {access_token : data})
    })
}

const verifyToken = (token, cb) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'takut123', (err, data) => {
            if(err) reject (err)
            else resolve (data)
        })
    })
}

module.exports = { generateToken, verifyToken }