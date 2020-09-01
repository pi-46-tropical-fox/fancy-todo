const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {

    static register(req, res) {
        const { username, password, email } = req.body

        User.create({ username, email, password })
        .then(user => {
            const { username, email } = user
            res.status(201).json(user)
        })
        .catch( err => {
            console.log(err, ' <=== error register')
            res.status(500).json({message:"internal error server"})
        })
    }

    static login(req, res) {
        const { username, password } = req.body

        User.findOne({where:{username}})
        .then(user => {

            if(!user) {
                return res.status(400).json({message:'invalid username/password'})
            }
            return user})
            .then(user => {
            const isValid = bcryptjs.compareSync(password, user.password)

            if (isValid) {
                //generate jwt
                const secret = 'lalalalilili'
                const access_token = jwt.sign({username:user.username, id:user.id}, secret)

                return res.status(200).json({access_token})
            }
            else {
                return res.status(400).json({message:'invalid username/password'})
            }
        })
        .catch(err => {
            console.log(err, '<=== error login')
            return res.status(500).json({message:'Internal error server'})
        })
    }
}

module.exports = userController