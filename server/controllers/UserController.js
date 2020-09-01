const { User } = require('../models')
const { compare } = require('../helpers/passwordHash')
const { generateToken } = require('../helpers/token')

class Controller {
    static async register(req, res) {
        try {
            const { email, password } = req.body
            await User.create({ email, password })

            res.status(201).json(email)
        } catch (err) {
            res.status(500).json({ msg: 'Interval Server Error' })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const found = await User.findOne({ where: { email } })
            const pass = await compare(password, found.password)

            if (found && pass) {
                generateToken({email : found.email, id : found.id}, (err, data) => {
                    if (err) throw err
                    else res.status(200).json(data)
                })
            } else {
                res.status(401).json({ msg: 'Email / Password Salah' })
            }
        } catch (err) {
            res.status(500).json({ msg: 'Interval Server Error' })
        }
    }
}

module.exports = Controller