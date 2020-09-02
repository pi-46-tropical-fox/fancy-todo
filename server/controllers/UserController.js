const {User} = require('../models')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static async register (req, res, next) {
        try {
            let obj = {
                firstName: req.body.firstName.trim(),
                lastName: req.body.lastName.trim(),
                email: req.body.email.trim(),
                password: req.body.password.trim()
            }
            const user = await User.create(obj)
            const access_token = generateToken(user)
            return res.status(201).json({access_token})
        } catch(err) {
            return next(err)
        }
    }
    static async login (req, res, next) {
        try {
            const user = await User.findOne({
                where : {
                    email : req.body.email.trim()
                }
            })
            if(user){
                let match = bcrypt.compareSync(req.body.password.trim(), user.password)
                if(match){
                    const access_token = generateToken(user)
                    return res.status(200).json({access_token})
                }else{
                    throw {name: `InvalidEmailPassword`}
                }
            }else{
                throw {name: `InvalidEmailPassword`}
            }
        } catch(err) {
            return next(err)
        }
    }
}

module.exports = UserController