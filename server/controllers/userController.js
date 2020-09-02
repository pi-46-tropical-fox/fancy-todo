const {User} = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

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
            const isValid = comparePassword(password, user.password)
            if(isValid) {
                const access_token = generateToken({email: user.email, id: user.id})
                return res.status(200).json({access_token})
            } else {
                return res.status(400).json({message: "Invalid Password"})
            }
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = UserController