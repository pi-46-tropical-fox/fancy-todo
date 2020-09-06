const {User} = require('../models')
const {comparePassword} = require('../helpers/compare')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body

        User.create({username, email, password})
        .then(user => {
            const {username, email} = user
            return res.status(201).json({username, email})
        })
        .catch(err => {
            return next(err)
        })
    }

    static login(req, res) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(user =>{
            if(user){
                let isValid = comparePassword(req.body.password, user.password)
                if(isValid){
                    const access_token = generateToken(user)
                    return res.status(200).json({access_token})
                }
                else{
                    throw {message: 'Invalid Email Error', statusCode: 400}
                }
            }
            else{
                throw {message: 'Invalid Email Error', statusCode: 400}
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}



module.exports = UserController