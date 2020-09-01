const jwt = require('jsonwebtoken')
const secret = 'secret'

const generateToken = (email, id) =>{
    console.log(email)
    const acces_token = jwt.sign({email, id},secret)
    return acces_token
}

const verifyToken = (token) =>{
    const verified = jwt.verify(token,secret)
    return verified
}

module.exports = { generateToken, verifyToken }