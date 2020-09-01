const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const generateToken = userData => jwt.sign(userData, secretKey);

const verifyToken = access_token => jwt.verify(access_token, secretKey);

module.exports = { generateToken, verifyToken };
