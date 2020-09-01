const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');

class UserController {
	static async register(req, res, next) {
		const { email, password } = req.body;
		try {
			const user = await User.create({ email, password });

			return res.status(201).json({ id: user.id, email: user.email });
		} catch (error) {
			return next(error);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });

			let notValid = false;
			if (user) {
				const isValidPassword = bcrypt.compareSync(password, user.password);
				if (isValidPassword) {
					const access_token = generateToken({
						id: user.id,
						email: user.email,
					});

					return res.status(200).json({ access_token });
				} else {
					notValid = true;
				}
			}

			if (notValid || user === null) {
				throw { name: 'invalidLogin' };
			}
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = UserController;
