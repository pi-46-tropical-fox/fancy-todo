const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID

class UserController {
	static async register(req, res, next) {
		try {
			const { id, email } = await User.create(req.body);

			res.status(201).json({ id, email });
		} catch (err) {
			next(err);
		}
	}

	static async googleLogin(req, res, next){
		const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);
		const { google_access_token } = req.headers;

		console.log(google_access_token)

		try {
			const ticket = await client.verifyIdToken({
				idToken : google_access_token,
				audience : GOOGLE_OAUTH_CLIENT_ID
			})

			const payload = ticket.getPayload()
			console.log(payload)

			const username = payload.email.split('@')[0] + Math.ceil(Math.random()*100).toString()

			let user = await User.findOne({
				where : {
					email : payload.email
				}
			})

			if(!user){
				user = await User.create({
					username, email : payload.email, password : 'a1a1a1a1a1a1'
				})
			}

			const access_token = generateToken({ id: user.id });

			res.status(200).json({ access_token, username : user.username , email : user.email });

		} catch(err){
			next(err)
		}

	}

	static async login(req, res, next) {
		try {
			const { password, email } = req.body;
			const data = await User.findOne({
				where: {
					email,
				},
			});
			
			if(!data){
				throw { message: 'Username/Password not found', statusCode: 400 };
			}

			const pass = await bcrypt.compare(password, data.password);

			if (pass) {
				const access_token = generateToken({ id: data.id });

				res.json({ access_token, username : data.username, email });
			} else {
				throw { message: 'Username/Password not found', statusCode: 400 };
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = UserController;
