const {User} = require('../models')
const bcrypt = require('bcryptjs')
const {generateToken, verifyToken} = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        const { username, email, password } = req.body

        User.create({username, email, password})
        .then(user => {
            const {username, email} = user
            res.status(201).json({username, email})
        })
        .catch(err => {
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static login(req, res) {
        const { username, password } = req.body

        User.findOne({where: {username}})
        .then(user => {
            if (!user) {
                return res.status(400).json({message: 'Invalid email or password'})
            }

            return user
        })

        .then(user => {
            const isValid = bcrypt.compareSync(password, user.password)

            if (isValid) {
                const access_token = generateToken(user)

                return res.status(200).json({ access_token })
            } else {
                return res.status(400).json({message: 'Invalid email or password'})
            }
        })
        .catch(err => {
            return res.status(500).json({message: "Internal Server Error"})
        })
    }
}

module.exports = UserController