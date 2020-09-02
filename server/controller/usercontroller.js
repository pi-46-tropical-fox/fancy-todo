const {User} = require('../models')
const {isValid} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')

class UserController {
    static async register (req, res, next) {
        try {
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
}

module.exports = UserController