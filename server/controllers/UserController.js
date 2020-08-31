const {User} = require('../models')

const {generateToken} = require('../helpers/jwt.js')
const {compareBcrypt} = require('../helpers/bcrypt.js')

class UserController {

    static async register(req,res) {
        try {
            const user = await User.create({username,email,password})
            const {username,email} = user
            res.status(201).json({username,email})

        } catch(err) {
            console.log(err, "error register");
            res.status(500).json({msg: "internal error server"})
        }
    }

    static login (req,res) {
        const {username,password} = req.body

        User.findOne({where: {username}})
            .then(user => {
                if(!user) {
                    return res.status(400).json({msg: "invalid email or password"})
                }

                return user
            })
            .then(user => {
                const isValid = compareBcrypt(password, user.password)
                if(isValid) {
                    const access_token = generateToken(user)
                    
                    return res.status(200).json({access_token})
                } else {
                    return res.status(400).json({msg: "invalid email or password"})
                }
            
            })
            .catch(err => {
                res.status(500).json({msg: "internal error server"})
            })
    }

}

module.exports = UserController