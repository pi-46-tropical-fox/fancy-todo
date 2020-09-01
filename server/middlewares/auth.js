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
			throw { name: 'notAuthenticated' };
		}
	} catch (error) {
		next(error);
	}
};

const authorizationTodoByUserId = async (req, res, next) => {
	try {
		const { id } = req.userData;
		const todo = await Todo.findOne({ where: { id: req.params.id } });

		if (todo) {
			if (todo.UserId === id) {
				next();
			} else {
				throw { name: 'notAuthorized' };
			}
		} else {
			throw { name: 'notFound' };
		}
	} catch (error) {
		next(error);
	}
};

module.exports = { authentication, authorizationTodoByUserId };
