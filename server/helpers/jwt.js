const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (data) => {
    const access_token = jwt.sign({ email: data.email }, secret);
    return access_token
}

module.exports = { generateToken }