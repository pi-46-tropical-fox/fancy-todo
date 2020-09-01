const {User} = require('../models')
const {isValid} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')

class UserController {
    static register (req, res) {
        const {username, email, password} = req.body

        User.create({username, email, password})
            .then(user => {
                const {username, email} = user
                res.status(201).json({username, email})
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }

    static login (req, res) {
        const {username, password} = req.body

        User.findOne({
            where: {
                username
            }
        }).then(user => {
            if (!user) {
                return res.status(400).json({message: 'Wrong username/password'})
            }

            return user
        }).then(user => {
            if (isValid) {
                const access_token = tokenGenerator(user)

                return res.status(200).json({access_token})
            } else {
                return res.status(400).json({message: 'Wrong username/password'})
            }
        }).catch(err => {
            res.status(500).json({message: err.message})
        })

    }
}

module.exports = UserController