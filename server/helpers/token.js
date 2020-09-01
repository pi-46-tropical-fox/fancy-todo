let jwt = require('jsonwebtoken')

const generateToken = (data, cb) => {
    jwt.sign(data, process.env.JWT_PASS, (err, data) => {
        if (err) cb(err)
        else cb(null, {access_token : data})
    })
}

const verifyToken = (token, cb) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_PASS, (err, data) => {
            if(err) reject (err)
            else resolve (data)
        })
    })
}

module.exports = { generateToken, verifyToken }