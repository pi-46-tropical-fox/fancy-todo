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
            return next(err)
        }
    }

    static async register(req, res, next){
        try {
            // biar bisa di-limit inputan apa aja yang bisa masuk
            let newUser = {
                name: req.body.name,
                username: req.body.username,
                password: req.body.password
            }

            // create user, terus dibalikin lagi dalam bentuk instance
            let user = await User.create(newUser)

            // destructure object-nya, ambil bagian-bagian yang non-sensitif aja
            let { id, username, createdAt } = user

            // lempar hasilnya
            return res.status(201).json({ id, username, createdAt })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = AuthController