const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const generateToken = (user) => {
    const {id, firstName, lastName, email} = user
    return jwt.sign({id, firstName, lastName, email}, secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {generateToken, verifyToken}