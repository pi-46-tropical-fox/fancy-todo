const jwt = require('jsonwebtoken');
const { verifyToken } = require('../helpers/jwt');

const authentication = (req, res, next) => {
	const { access_token } = req.headers;

	try {
		const userData = verifyToken(access_token);

		console.log(userData, "Data from the JWT")
		next()
	} catch (err) {
		// Error handling
	}
};

const authorization = (req, res, next) => {
	
}


module.exports = { authentication };
