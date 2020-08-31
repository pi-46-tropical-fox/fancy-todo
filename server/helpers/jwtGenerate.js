const jwt = require("jsonwebtoken")
const secret = "teamsecret";

function generateToken (userData){
  const {username, password} = userData
  let access_token = jwt.sign({username, password}, secret)
  return access_token
}

function verifyToken (token){
  return jwt.verify(token, secret)
}

module.exports = {generateToken, verifyToken}