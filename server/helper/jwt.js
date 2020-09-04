const jwt = require('jsonwebtoken')
let secret = process.env.SECRET

const generateToken = (user) => {
   const token = jwt.sign({ id: user.id, username: user.email }, secret)
   return token
}

const verifyToken = (token)=>{
    const verified = jwt.verify(token,secret)
    return verified
}

module.exports = {generateToken, verifyToken} 
