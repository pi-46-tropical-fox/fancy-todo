const jwt = require('jsonwebtoken');
// const secret = "rahasia"
const secret = process.env.SECRET

function generateToken(data) {
    const {email,password} = data
    let acces_token = jwt.sign({email,password}, secret)
    return acces_token
}

function verifyToken(token) {
    return jwt.verify(token, secret)
}

module.exports = {
    generateToken,verifyToken
};
