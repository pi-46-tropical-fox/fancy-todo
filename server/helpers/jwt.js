const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function generateToken(user) {
    const access_token = jwt.sign({ username: user.name, id: user.id },secret)
    return access_token
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}

module.exports = { generateToken, verifyToken }