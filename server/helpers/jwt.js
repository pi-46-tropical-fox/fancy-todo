const jwt = require("jsonwebtoken");
const secret = process.env.secret;

const generateToken = (user) => {
  const accessToken = jwt.sign({ username: user.username, id: user.id }, secret);
  return accessToken;
}

const verifyToken = (token) => {
  return jwt.verify(token, secret);
}

module.exports = {
  generateToken,
  verifyToken
};