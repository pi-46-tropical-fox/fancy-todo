const { User } = require ('../models')
const { generateToken } = require('../helpers/jwt')
const validateUser = require('../helpers/validateUser')

class UserController {
    static register (req,res) {
        const { username, email, password } = req.body

        User.create({username, email, password})
            .then(user => {
                const { username, email } = user
                res.status(201).json({username, email})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "internal error server"})
            })
    }

    static login (req,res) {
        const {username, password} = req.body

        User.findOne({where : { username }})
            .then( user => {
                if (!user) {
                    res.status(400).json({ message : "Invalid username or password"})
                }
                return user
            })
            .then(user => {
                const isValid = validateUser(password, user.password)

                if (isValid) {
                    const token = generateToken(user)
                    return res.status(200).json({token})
                } else {
                    res.status(400).json({ message : "Invalid username or password"})
                }
            })
            .catch( err => {
                return res.status(500).json({message : "Internal server error"})
            })
    }
}

module.exports = UserController