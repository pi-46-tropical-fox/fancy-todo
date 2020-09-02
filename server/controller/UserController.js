const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');
//###############################################################
class Controller {
    static register(req, res, next) {
        const { username, email, password } = req.body;
        User.create({ username, email, password })
            .then(user => {
                const { username, email } = user
                res.status(201).json({ username, email })
            })
            .catch(err => {
                return next(err)
            })
    };

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    const isValid = compare(password, user.password) //Compare Password(using bacrypt)//
                    if (isValid) {
                        const access_token = generateToken(user) //Generate Token (using JWT)//
                        return res.status(200).json({ access_token })
                    } else {
                        throw { message: "Username/password is invalid", statusCode: 400 }
                    }
                } else {
                    throw { message: "Username/password is invalid", statusCode: 400 }
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}
module.exports = Controller