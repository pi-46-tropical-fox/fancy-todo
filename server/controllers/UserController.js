const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library')

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


	static googleLogin(req, res, next) {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
		const { google_access_token } = req.headers
		let email_google
		client.verifyIdToken({
			idToken: google_access_token,
			audience: process.env.GOOGLE_CLIENT_ID
		})
			.then(ticket => {
				return ticket.getPayload()
			})
			.then(payload => {
				email_google = payload.email
				return User.findOne({ where: { email: payload.email } })
			})
			.then(user => {
				if (!user) {
					return User.create({
						email: email_google,
						password: 'heufh77efur8ufj'
					})
				} else {
					return user
				}
			})
			.then(user => {
				const payload = { email: user.email, id: user.id }
				const access_token = generateToken(payload)

				return res.status(200).json({ access_token })
			})
			.catch(err => {
				next(err)
			})
	}
}

module.exports = UserController;
