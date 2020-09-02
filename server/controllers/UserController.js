const {User} = require('../models')
const {comparePassword} = require('../helpers/compare')
const {generateToken, verifyToken} = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        const { username, email, password } = req.body

        User.create({username, email, password})
        .then(user => {
            const {username, email} = user
            res.status(201).json({username, email})
        })
        .catch(err => {
            res.status(500).json({message: "Internal Server Error"})
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
                    return res.status(400).json({message: 'Invalid Email or Password'})
                }
            }
            else{
                return res.status(400).json({message: 'Invalid Email or Password'})
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message: 'internal server error'})
        })
    }
}


module.exports = UserController