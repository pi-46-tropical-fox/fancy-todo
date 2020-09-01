const { User } = require('../models')
const { compareHash, createHash } = require('../helpers/BcryptHelper')
const { generateToken } = require('../helpers/AuthHelper')
const errors = require('../helpers/ErrorHelper')

class AuthController {
    static async login(req, res){
        try {
            let { username, password } = req.body
            let user = await User.findOne({ where: { username } })

            if(user){
                let valid = compareHash(password, user.password)
                if(valid){
                    let access_token = generateToken({ username, id: user.id })

                    return res.status(200).json(access_token)
                }else{
                    return errors.throwUnauthorized(res, 'Username or password you entered is incorrect. Hmm... which one is it?')
                }
            }else{
                return errors.throwUnauthorized(res, 'Username or password you entered is incorrect. Hmm... which one is it?')
            }
        } catch (err) {
            return errors.throwServerError(res, err)
        }
    }

    static async register(req, res){
        try {
            req.body.password = createHash(req.body.password)

            let newUser = await User.create(req.body)
            let { id, username, createdAt } = newUser

            return res.status(201).json({ id, username, createdAt })
        } catch (err) {
            return errors.throwServerError(res, err)
        }
    }
}

module.exports = AuthController