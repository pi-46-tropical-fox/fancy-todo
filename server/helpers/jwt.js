const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (user) => {
    let access_token = jwt.sign(
        {id: user.id, email: user.email},
        secret
    )
    return access_token
}

module.exports = { generateToken }