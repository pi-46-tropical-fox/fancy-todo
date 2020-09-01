const { verifyToken } = require('../helpers/jwt');
const { Todo } = require('../models');

const authentication = (req, res, next) => {
	const { access_token } = req.headers;

	try {
		const userData = verifyToken(access_token);
		req.userData = userData;
		next();
	} catch (error) {
		res.status(401).json({ message: 'User not authenticated' });
	}
};

const authorizationTodoByUserId = async (req, res, next) => {
	try {
		const { id } = req.userData;
		const todo = await Todo.findOne({ where: { id: req.params.id } });
		if (todo.UserId === id) {
			next();
		} else {
			throw err;
		}
	} catch (error) {
		res.status(401).json({ message: 'User not authorized' });
	}
};

module.exports = { authentication, authorizationTodoByUserId };
