const errorHandler = (err, req, res, next) => {
	let statusCode = 500;
	let errors = [];
	switch (err.name) {
		case 'SequelizeValidationError':
		case 'SequelizeUniqueConstraintError':
			statusCode = 400;
			err.errors.forEach(el => {
				errors.push({
					name: el.validatorKey,
					message: el.message,
				});
			});
			break;
		case 'invalidLogin':
			statusCode = 400;
			errors.push({
				name: err.name,
				message: 'Invalid email or password!',
			});
			break;
		case 'notFound':
			statusCode = 404;
			errors.push({
				name: err.name,
				message: 'Error todo not found',
			});
			break;
		case 'notAuthorized':
			statusCode = 401;
			errors.push({
				name: err.name,
				message: 'User not authorized accessing this Todo',
			});
			break;
		case 'notAuthenticated':
			statusCode = 401;
			errors.push({
				name: err.name,
				message: 'User not authenticated',
			});
			break;
		case 'invalidHeaderRapidAPI':
			statusCode = 400;
			errors.push({
				name: err.name,
				message: 'Invalid Header Rapid API',
			});
			break;

		default:
			statusCode = 500;
			errors.push({
				name: 'InternalServerError',
				message: 'Internal server error',
			});
			break;
	}

	return res.status(statusCode).json({ errors });
};

module.exports = errorHandler;
