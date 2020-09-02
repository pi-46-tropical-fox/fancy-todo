const { User } = require('../models')
const { generateToken } = require('../helpers/AuthHelper')
const { compareHash } = require('../helpers/BcryptHelper')

class AuthController {
    static async login(req, res, next){
        try {
            let { username, password } = req.body
            let user = await User.findOne({ where: { username } })

            if(user){
                let valid = compareHash(password, user.password)
                if(valid){
                    let access_token = generateToken({ username, id: user.id })

                    return res.status(200).json(access_token)
                }else{
                    throw { code: 400, msg: 'Username or password you entered is incorrect. Hmm... which one is it?' }
                }
            }else{
                throw { code: 400, msg: 'Username or password you entered is incorrect. Hmm... which one is it?' }
            }
        } catch (err) {
            if(!err.code){
                err = { code: 400, msg: 'Did you enter the required inputs?' }
            }

            return next(err)
        }
    }

    static async register(req, res, next){
        try {
            let newUser = await User.create(req.body)
            let { id, username, createdAt } = newUser

            return res.status(201).json({ id, username, createdAt })
        } catch (err) {
            let error = {
                code: 400,
                msg: []
            }

            switch(err.name){
                case 'SequelizeValidationError':
                    err.errors.forEach(e => {
                        error.msg.push(`${e.path}: ${e.message}`)
                    })
                break
                case 'SequelizeUniqueConstraintError':
                    err.errors.forEach(e => {
                        error.msg.push(`${e.type}: ${e.message}`)
                    })
                break
            }
            
            return next(error)
        }
    }
}

module.exports = AuthController