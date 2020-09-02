const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (data) => {
    return jwt.sign(data, secret)
}

const verifyToken = (data) => {
    return jwt.verify(data, secret)
}

module.exports = {
    generateToken,
    verifyToken,
}