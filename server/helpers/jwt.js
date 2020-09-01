const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function generateToken(data) {
	return jwt.sign(data, secret);
}

function verifyToken(token){
	return jwt.verify(token, secret)
}

module.exports = { generateToken };
