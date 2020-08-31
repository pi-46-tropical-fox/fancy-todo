const {User} = require('../models')
const bcrypt = require('bcryptjs')
const {generateToken, verifyToken} = require('../helpers/jwt')

class UserController {
    static register (req, res) {
        let obj = {
            email: req.body.email.trim(),
            password: req.body.password.trim()
        }
        User.create(obj)
        .then(user => {
            const {id, email} = user
            return res.status(201).json({id, email})
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError'){
                let errors = []
                for(const el of err.errors){
                    errors.push(el.message)
                }
                return res.status(400).json({message: errors})
            }else if(err.name === 'SequelizeUniqueConstraintError'){
                let msg = 'Email already exists'
                err.errors[0].message = msg
                return res.status(400).json({message: msg})
            }else{
                return res.status(500).json({message: err.message})
            }
        })
    }
    static login (req, res) {
        User.findOne({
            where : {
                email : req.body.email.trim()
            }
        })
        .then(user => {
            if(user){
                let match = bcrypt.compareSync(req.body.password.trim(), user.password)
                if(match){
                    const accessToken = generateToken(user)
                    return res.status(200).json({accessToken})
                }else{
                    return res.status(400).json({message: `Email/password is incorrect`})
                }
            }else{
                return res.status(400).json({message: `Email/password is incorrect`})
            }
        })
        .catch(err => {
            return res.status(500).json({message: err.message})
        })
    }
}

module.exports = UserController