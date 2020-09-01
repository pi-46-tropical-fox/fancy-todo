const { User } = require('../models');
const { compare } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')

class Controller {
    static register(req, res) {
        const { username, email, password } = req.body;
        User.create({ username, email, password })
            .then(user => {
                const { username, email } = user
                res.status(201).json({ username, email })
            })
            .catch(err => {
                console.log(err, '<<< ini error')
                res.status(500).json({ message: "Internal Server Error" })
            })
    };

    static login(req, res) {
        const { username, password } = req.body;
        User.findOne({ where: { username } })
            .then(user => {
                if (user) {
                    const isValid = compare(password, user.password) //Compare Password(using bacrypt)//
                    if (isValid) {
                        const access_token = generateToken(user) //Generate Token (using JWT)//
                        return res.status(200).json({ access_token })
                    } else {
                        return res.status(400).json({ message: "Username/password is invalid" })
                    }
                } else {
                    return res.status(400).json({ message: "Username/password is invalid" })
                }
            })
            .catch(err => {
                console.log(err, '<<< ini error')
                res.status(500).json({ message: "Internal Server Error" })
            })
    }
}
module.exports = Controller