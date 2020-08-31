const jwt = require('jsonwebtoken')
const secret = 'secret'

const generateToken = (email) =>{
    console.log(email)
    const acces_token = jwt.sign({email },secret)
    return acces_token
}

module.exports = generateToken