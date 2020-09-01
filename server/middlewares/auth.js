const { verifyToken } = require('../helpers/jwt');
const { Todo, User } = require('../models');

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;

	try {
		const userData = verifyToken(access_token);
		const user = await User.findByPk(userData.id);
		if (user) {
			req.userData = userData;
			next();
		} else {
			throw err;
		}
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
