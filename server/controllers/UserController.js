const { User } = require('../models')
const { generateToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class UserController {

    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const newUser = await User.create({email, password})
            return res.status(201).json({
                email: newUser.email,
            })
        } 
        catch(err) {
            next(err)
        }
    }

    static login(req,res, next){
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user=>{
            if(user){
                let check = comparePassword(req.body.password,user.password)
                if(check){
                    let token = generateToken(user)
                    res.status(200).json({token})
                }else{
                    throw {message: "Invalid Username or Password", statusCode: 400}
                }
            }else{
                throw {message: "Invalid Username or Password", statusCode: 400}
            }
        })
        .catch(err=>{
            next(err)
        })
    }

}

module.exports = UserController