const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const generateToken = userData => jwt.sign(userData, secretKey);

const verifyToken = access_token => {
	try {
		return jwt.verify(access_token, secretKey);
	} catch (error) {
		throw { name: 'notAuthenticated' };
	}
};

module.exports = { generateToken, verifyToken };
