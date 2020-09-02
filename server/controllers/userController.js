const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../helpers/jwt.js')
const user = require('../models/user')
// const { noExtendLeft } = require('sequelize/types/lib/operators')

class userController {

    //PROMISE
    // static register(req, res) {
    //     const { username, password, email } = req.body


    //     User.create({ username, email, password })
    //         .then(user => {
    //             const { username, email } = user
    //             res.status(201).json(user)
    //         })
    //         .catch(err => {
    //             console.log(err, ' <=== error register')
    //             res.status(500).json({ message: "internal error server" })
    //         })
    // }

    //ASYNC AWAIT 
    static async register(req, res, next) {
        // console.log(User.create({ username, email, password }), '<==user.create')
        try {
            const { username, password, email, city } = req.body
            const user = await User.create({ username, email, password, city })
            return res.status(201).json({ username:user.username, email:user.email, city:user.city })
        } catch(err) {
            // console.log(err, ' <=== error register')
            // return res.status(500).json({ message: "internal error server" })
            return next(err)
        }
    }

    static login(req, res, next) {
        const { username, password } = req.body

        User.findOne({ where: { username } })
            .then(user => {

                if (!user) {
                    // return res.status(400).json({ message: 'invalid username/password' })
                    throw {message:'invalid username/password', statusCode:400 }
                }
                return user
            })
            .then(user => {
                const isValid = bcryptjs.compareSync(password, user.password)

                if (isValid) {
                    //generate jwt
                    const access_token = generateToken(user)

                    return res.status(200).json({ access_token })
                }
                else {
                    throw {message:'invalid username/password', statusCode:400 }
                }
            })
            .catch(err => {
                console.log(err, '<=== error login')
                return next(err)
                // return res.status(500).json({ message: 'Internal error server' })
            })
    }
}

module.exports = userController