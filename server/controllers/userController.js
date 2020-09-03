const { User } = require ('../models')
const { generateToken } = require('../helpers/jwt')
const { validateUser } = require('../helpers/validateUser')

class UserController {
    static register (req,res,next) {
        const { username, email, password } = req.body

        User.create({username, email, password})
            .then(user => {
                const { username, email } = user
                res.status(201).json({username, email})
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static login (req,res, next) {
        const {email, password} = req.body

        User.findOne({where : { email }})
            .then( user => {
                if (!user) {
                    throw { message : "Invalid username or password" , statusCode : 400}
                }
                return user
            })
            .then(user => {
                const isValid = validateUser(password, user.password)

                if (isValid) {
                    const token = generateToken(user)
                    return res.status(200).json({token})
                } else {
                    throw { message : "Invalid username or password" , statusCode : 400}
                }
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = UserController