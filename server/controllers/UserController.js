const { User } = require("../models");
const { compare_bcrypt_password } = require("../helpers/bcrypt");
const { generate_jwt_token } = require("../helpers/jwt");

class UserController {
	static async register(req, res) {
		const { username, email, password } = req.body;
		try {
			const new_user = await User.create({ username, email, password });
			return res.status(201).json({ id: new_user.id, email: new_user.email });
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return res.status(400).json({ message: "Invalid Email or Password "});
			} else {
				const password_matched = compare_bcrypt_password(password, user.password);
				if (!password_matched) {
					return res.status(400).json({ message: "Invalid Email or Password "});
				} else {
					const access_token = generate_jwt_token({ id: user.id, username: user.username });
					return res.status(200).json({ access_token });
				}
			}
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = UserController;