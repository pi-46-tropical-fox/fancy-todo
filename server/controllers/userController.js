const {User} = require('../models')
const { generateToken } = require('../helpers/jwt')
const bcrypt = require('bcrypt')

class UserController {
    static async register(req, res) {
        const {username, email, password} = req.body
        try {
            const user = await User.create({username, email, password})
            return res.status(201).json({username, email})
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
    static async login (req, res) {
        const {email, password} = req.body
        try {
            const user = await User.findOne({where: { email }})
            if (!user) {
                return res.status(400).json({message: "Invalid Email"})
            }
            const isValid = bcrypt.compareSync(password, user.password)
            if(isValid) {
                const access_token = generateToken(user)
                return res.status(200).json({access_token})
            } else {
                return res.status(400).json({message: "Invalid Password"})
            }
        } catch(err) {
            console.log('fsda')
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = UserController