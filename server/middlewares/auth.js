"use strict";

const { verify_jwt_token } = require("../helpers/jwt");
const { Todo } = require("../models");

const authentication = (req, res, next) => {
	const { access_token } = req.headers;
	try {
		const decoded_user_data = verify_jwt_token(access_token);
		req.user = decoded_user_data;
		next();
	} catch(err) {
		return res.status(401).json({ message: "The user is not authenticated." });
	}
}

// sudah ada req.params.id dan req.user dari authentication
const authorization = async (req, res, next) => {
	const todo_id = +req.params.id;
	try {
		const todo = await Todo.findByPk(todo_id);
		if (todo && todo.UserId === req.user.id) {
			next();
		} else {
			return res.status(403).json({ message: "The user is not authorized." });
		}
	} catch(err) {
		return res.status(403).json({ message: "The user is not authorized." });
	}
}

module.exports = { authentication, authorization };