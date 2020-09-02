function errorHandler(error, req, res, next) {
	console.log(error);

	let statusCode = 500;
	const errors = [];

	switch (error.name) {
	case 'SequelizeValidationError':
	case 'SequelizeUniqueConstraintError':
		error.errors.forEach((e) => errors.push(e.message));
		statusCode = 400;
		break;

	case 'JsonWebTokenError':
		errors.push('User not authenticated');
		statusCode = 401;
		break;

	default:
		errors.push(error.message);
		statusCode = error.statusCode || 500;
	}

	res.status(statusCode).json({ errors });
}

module.exports = errorHandler;
