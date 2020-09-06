const { User } = require("../models");
const { compare_bcrypt_password } = require("../helpers/bcrypt");
const { generate_jwt_token } = require("../helpers/jwt");
const { OAuth2Client } = require('google-auth-library');


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
					return res.status(200).json({ access_token, UserId: user.id });
				}
			}
		} catch(err) {
			return next(err);
		}
	}

	static async googleLogin(req, res, next) {
		const client = new OAuth2Client(process.env.CLIENT_ID);
		const { google_access_token } = req.headers;
		async function verify() {
			try {
				const ticket = await client.verifyIdToken({
					idToken: google_access_token,
					audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
					// Or, if multiple clients access the backend:
					//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
				});
				const payload = ticket.getPayload(); // console.log({ payload });
				// const userid = payload['sub'];
				// If request specified a G Suite domain:
				// const domain = payload['hd'];
				let user = await User.findOne({ where: { email: payload.email } });
				if (!user) {
					const new_user_obj = {
						username: payload.email.split("@")[0],
						email: payload.email,
						password: "random"
					};
					user = await User.create(new_user_obj);
				}
				const access_token = generate_jwt_token(user);
				return res.status(200).json({ access_token, UserId: user.id });
			} catch(err) {
				return next(err);
			}
		}
		verify().catch(console.error);
	}
}

module.exports = UserController;