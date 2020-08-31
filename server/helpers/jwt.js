const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const generateToken = (user) => {
    const accessToken = jwt.sign({id: user.id, email: user.email}, secret)
    return accessToken
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {generateToken, verifyToken}