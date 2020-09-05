const { User } = require('../models')
const { generateToken } = require('../helpers/AuthHelper')
const { compareHash, generateRandomPassword } = require('../helpers/BcryptHelper')
const { OAuth2Client } = require('google-auth-library')

class AuthController {
    static async login(req, res, next){
        try {
            let { username, password } = req.body
            let user = await User.findOne({ where: { username } })

            if(user){
                let valid = compareHash(password, user.password)
                if(valid){
                    let access_token = generateToken({ username, id: user.id })
                    let name = user.name
                    username = user.username

                    return res.status(200).json({ access_token, name, username })
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

    static async googleLogin(req, res, next){
        try{
            let code = 200
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const { google_access_token } = req.headers

            const ticket = await client.verifyIdToken({
                idToken: google_access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()

            let user = await User.findOne({ where: { username: payload.email }})

            if(!user){
                const newUser = {
                    name: payload.name,
                    username: payload.email,
                    password: generateRandomPassword(20)
                }

                user = await User.create(newUser)

                code = 201
            }

            let tokenData = { id: user.id, username: user.username }

            const data = {
                access_token: generateToken(tokenData),
                name: user.name,
                username: user.username
            }

            res.status(code).json(data)
        }catch(err){
            next(err)
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