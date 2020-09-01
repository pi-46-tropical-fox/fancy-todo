const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET


function generateToken(user) {
    const token = jwt.sign({ id: user.id, name: user.name, email:user.email }, secret)

    return token
}

const validateToken = (token) => {
    var decoded = jwt.verify(token, secret)

    return decoded
}

module.exports = { generateToken, validateToken }