const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');

class UserController {
	static async register(req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.create({ email, password });

			return res.status(201).json({ id: user.id, email: user.email });
		} catch (error) {
			if ((error.name = 'SequelizeValidationError')) {
				return res.status(400).json({
					validation_errors: error.errors.map(err => {
						return {
							name: err.validatorKey,
							message: err.message,
						};
					}),
				});
			} else {
				return res.status(500).json({ message: 'Internal server error' });
			}
		}
	}

	static async login(req, res) {
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
				const invalidCredential = new Error('Invalid email or password!');
				invalidCredential.name = 'invalidCredential';
				throw invalidCredential;
			}
		} catch (error) {
			if (error.name === 'invalidCredential') {
				return res.status(400).json({ message: error.message });
			} else {
				return res.status(500).json({ message: 'Internal server error' });
			}
		}
	}
}

module.exports = UserController;
