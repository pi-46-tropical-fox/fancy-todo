const jwt = require('jsonwebtoken')
const secret = process.env.SECRET 

const generateToken = (user) => {
  // console.log(user, 'ini user di jwt');
  const payload = { email: user.email, id: user.id, name: user.name }
  const access_token = jwt.sign(payload, secret);

  return access_token;
}

const verifyToken = (token) => {
  // console.log(token, '<<<ini token');
  const verified = jwt.verify(token, secret)
  return verified
}

module.exports = { generateToken, verifyToken };