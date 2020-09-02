const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class UserController {
	static async register(req, res, next) {
		try {
			const { id, email } = await User.create(req.body);

			res.status(201).json({ id, email });
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { password, username } = req.body;
			const data = await User.findOne({
				where: {
					username,
				},
			});

			const pass = await bcrypt.compare(password, data.password);

			console.log(password, data.password);

			if (pass) {
				const access_token = generateToken({ id: data.id });

				res.json({ access_token });
			} else {
				throw { message: 'Username/Password not found', statusCode: 400 };
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = UserController;
