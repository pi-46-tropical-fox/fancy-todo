const jwt = require("jsonwebtoken")


function generateToken (userData){
  const {id, username, email} = userData
  let access_token = jwt.sign({id, username, email}, process.env.SECRET)
  return access_token
}

function verifyToken (token){
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {generateToken, verifyToken}