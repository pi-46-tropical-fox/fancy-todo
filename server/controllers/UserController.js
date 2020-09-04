const {User} = require('../models')

const {generateToken} = require('../helpers/jwt.js')
const {compareBcrypt} = require('../helpers/bcrypt.js')

class UserController {

    static async register(req,res,next) {
        try {
            const {username,email,password} = req.body
            const user = await User.create({username,email,password})
            let payload = {email: user.email, id: user.id}
            const access_token = generateToken(payload)
            return res.status(201).json({
                username: user.username,
                email: user.email
            })

        } catch(err) {
            return next(err)
        }
    }

    static async login (req,res,next) {
        const {username,password} = req.body
        try {
            const user = await User.findOne({where: {username}})
            if(!user) {
                throw {statusCode: 400, msg: "invalid email or password"}
            }
            
            const isValid = await compareBcrypt(password, user.password)
            if(isValid) {
                const access_token = generateToken(user)
                
                return res.status(200).json({access_token,id:user.id, username: user.username })
            } else {
                throw {statusCode: 400, msg: "invalid email or password"}
            }
        }
        catch(err) {
            return next(err)
        }
    }

}

module.exports = UserController