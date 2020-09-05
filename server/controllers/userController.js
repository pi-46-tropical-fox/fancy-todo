const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

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
            console.log(err)
            next(err)
        }
    }

    static login(req, res, next) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(data =>{
            if(data){
                let hasValid = comparePassword(req.body.password, data.password)
                if(hasValid){
                    const access_token = generateToken(data)
                    return res.status(200).json({access_token})
                }
                else{
                    throw {name: 'INVALID_EMAIL/PASSWORD', statusCode: 400}
                }
            }
            else{
                throw {name: 'INVALID_EMAIL/PASSWORD', statusCode: 400}
            }
        })

        .catch(err =>{
            next(err)
        })
    }

}

module.exports = UserController 