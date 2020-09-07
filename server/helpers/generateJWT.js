const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

function generateToken(data) {
    const {email,id} = data
    // let acces_token = jwt.sign({email,id}, secret)
    // return acces_token
    return jwt.sign({email,id}, secret)
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}

module.exports = {
    generateToken,verifyToken
};