const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const generateToken = (user) => {
    const access_token = jwt.sign({ username: user.username, email: user.email, id: user.id}, secret)

    return access_token
}

const verifyToken = (token) => {
    const verified = jwt.verify(token, secret)
    return verified
}

module.exports = {generateToken, verifyToken}