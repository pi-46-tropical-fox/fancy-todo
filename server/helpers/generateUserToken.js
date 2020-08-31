const jwt = require("jsonwebtoken")


function generateToken (userData){
  const {username, password} = userData
  let access_token = jwt.sign({username, password}, process.env.SECRET)
  return access_token
}

function verifyToken (token){
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {generateToken, verifyToken}