const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (user)=>{
    const acces_token = jwt.sign({id:user.id ,username:user.username,email:user.email},secret)
    return acces_token
}   


const verify = (token)=>{
    const acc_token = jwt.verify(token,secret)
    return acc_token
}
module.exports = {generateToken, verify }