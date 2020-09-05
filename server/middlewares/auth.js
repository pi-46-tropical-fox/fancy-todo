"use strict";

const { verify_jwt_token } = require("../helpers/jwt");
const { User, Todo } = require("../models");

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;
	try {
		const decoded_user_data = verify_jwt_token(access_token);
		const user = await User.findOne({
			where: {
				email: decoded_user_data.email
			}
		});
		if (!user) {
			throw { message: "The user is not authenticated.", status_code: 401 };
		}
		req.user = user;
		return next();
	} catch(err) { // err = { name: "JsonWebTokenError", message: err.message };
		return next(err);
	}
}

const authorization = async (req, res, next) => {
	const todo_id = +req.params.id;
	try {
		const todo = await Todo.findByPk(todo_id);
		if (todo && todo.UserId === req.user.id) {
			return next();
		} else {
			throw { message: "The user is not authorized.", status_code: 403 };
		}
	} catch(err) {
		return next(err);
	}
}

module.exports = { authentication, authorization };