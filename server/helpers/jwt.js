const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const tokenGenerator = (user) => {
    const access_token = jwt.sign({username: user.username, id: user.id}, secret);

    return access_token
}

const verifyToken = (token) => {
    const verified = jwt.verify(token, secret)
    return verified
}

module.exports = {
    tokenGenerator,
    verifyToken
}