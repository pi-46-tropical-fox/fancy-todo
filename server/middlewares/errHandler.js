"use strict";

const errHandler = (err, req, res, next) => {
	let status_code;
	const errors = [];
	switch(err.name) {
		case "SequelizeValidationError" :
			err.errors.forEach(error => {
				errors.push(error.message);
			});
			status_code = 400;
			break;
		case "SequelizeUniqueConstraintError" :
			err.errors.forEach(error => {
				errors.push(error.message);
			});
			status_code = 400;
			break;
		case "JsonWebTokenError" :
			errors.push("The user is not authenticated");
			status_code = 401;
			break;
		default :
			errors.push(err.message);
			status_code = err.status_code || 500;
			break;
	}
	return res.status(status_code).json(errors);
}

module.exports = errHandler;