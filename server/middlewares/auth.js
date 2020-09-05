const { verifyToken } = require('../helpers/jwt');
const { Todo } = require('../models');

const authentication = (req, res, next) => {
	try {
		const { access_token } = req.headers;

		const userData = verifyToken(access_token);
		req.userData = userData;

		next();
	} catch (err) {
		next(err);
	}
};

const authorization = async (req, res, next) => {
	const { id } = req.params;
	try {
		const todo = await Todo.findByPk(id);

		if (!todo) {
			throw ({ message: 'not found', statusCode: 404 });
		}
		if (todo.UserId == req.userData.id) {
			req.todo = todo;
			next();
		} else {
			throw ({ message: 'forbidden access', statusCode: 403 });
		}
	} catch (err) {
		next(err);
	}
};

module.exports = { authentication, authorization };
