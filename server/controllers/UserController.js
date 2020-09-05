const {User} = require('../models')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async register (req, res, next) {
        try {
            let obj = {
                firstName: req.body.firstName.trim(),
                lastName: req.body.lastName.trim(),
                email: req.body.email.trim(),
                password: req.body.password.trim()
            }
            const user = await User.create(obj)
            const access_token = generateToken(user)
            return res.status(201).json({access_token})
        } catch(err) {
            return next(err)
        }
    }
    static async login (req, res, next) {
        try {
            const user = await User.findOne({
                where : {
                    email : req.body.email.trim()
                }
            })
            if(user){
                let match = bcrypt.compareSync(req.body.password.trim(), user.password)
                if(match){
                    const access_token = generateToken(user)
                    return res.status(200).json({access_token})
                }else{
                    throw {name: `InvalidEmailPassword`}
                }
            }else{
                throw {name: `InvalidEmailPassword`}
            }
        } catch(err) {
            return next(err)
        }
    }
    static async googleLogin (req, res, next) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const {google_access_token} = req.headers
            const ticket = await client.verifyIdToken({
                idToken: google_access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const {given_name, family_name, email} = payload
            const user = await User.findOne({
                where : {
                    email
                }
            })
            if(user){
                let match = bcrypt.compareSync(process.env.DEFAULT_PASSWORD_GOOGLE, user.password)
                if(match){
                    const access_token = generateToken(user)
                    return res.status(200).json({access_token})
                }else{
                    throw {name: `InvalidEmailPassword`}
                }
            }else{
                let obj = {
                    firstName: given_name,
                    lastName: family_name,
                    email: email,
                    password: process.env.DEFAULT_PASSWORD_GOOGLE
                }
                const newUser = await User.create(obj)
                const access_token = generateToken(newUser)
                return res.status(201).json({access_token})
            }
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = UserController