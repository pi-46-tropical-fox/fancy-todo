const { User } = require("../models");
const { compare_bcrypt_password } = require("../helpers/bcrypt");
const { generate_jwt_token } = require("../helpers/jwt");

class UserController {
	static async register(req, res, next) {
		const { username, email, password } = req.body;
		try {
			const new_user = await User.create({ username, email, password });
			return res.status(201).json({ id: new_user.id, email: new_user.email });
		} catch(err) {
			return next(err);
		}
	}

	static async login(req, res, next) {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				throw { message: "The Email or Password is invalid.", status_code: 400 };
			} else {
				const password_matched = compare_bcrypt_password(password, user.password);
				if (!password_matched) {
					throw { message: "The Email or Password is invalid.", status_code: 400 };
				} else {
					const access_token = generate_jwt_token(user);
					return res.status(200).json({ access_token });
				}
			}
		} catch(err) {
			return next(err);
		}
	}
}

module.exports = UserController;