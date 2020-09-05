const {User} = require('../models')
const {isValid} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async register (req, res, next) {
        try {
            console.log(req.body);
            const {username, email, password} = req.body

            const newUser = await User.create({username, email, password})

            return res.status(201).json({
                username: newUser.username,
                email: newUser.email
            })
        } catch (err) {
            return next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body

            let user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw {message: 'Wrong username / password', statusCode: 400}
            }

            if (isValid(password, user.password)) {
                const access_token = tokenGenerator(user)

                return res.status(200).json({access_token})
            } else {
                throw {message: 'Wrong username / password', statusCode: 400}
            }
        } catch (err) {
            return next(err)
        }
    }

    static googleLogin (req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const {google_access_token} = req.headers
        let email
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        }).then(ticket => {
            return ticket.getPayload();
        }).then(payload => {
            email = payload.email
            return User.findOne({where: {email: payload.email}})
        }).then(user => {
            if (!user) {
                let userObj = {
                    username: email,
                    email,
                    password: 'bebasaja'
                }
                return User.create(userObj)
            } else {
                return user
            }
        }).then(user => {
            let userObj = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            const token = tokenGenerator(userObj)

            return res.status(200).json({access_token: token})
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = UserController