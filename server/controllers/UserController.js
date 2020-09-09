const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bycrpt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const newUser = await User.create({email, password})

            return res.status(201).json({
                email: newUser.email,
            })
        } catch(err) {
            return next(err)
        }
    }
   
    static login(req, res, next) {
        let options = {
            where: {
                email: req.body.email
            }
        }
        User.findOne(options)
        .then(data => {
            if (data) {
                let isValid = comparePass(req.body.password, data.password)
                if (isValid) {
                    
                    const access_token = generateToken(data)
                   return res.status(200).json({ access_token })
                } else {
                    throw { message: 'Invalid username or password', statusCode: 400 }
                }
            } else {
               throw { message: 'Invalid username or password', statusCode: 400 }
            }
        })
        .catch(err => {
            return next(err)
        })

    }
    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const { google_access_token } = req.headers
        let email_google;
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            email_google = payload.email
            return User.findOne({where:{email:payload.email}})
        })
        .then(user => {
            if (!user) {
                return User.create({
                    email: email_google,
                    password: 'password'
                })
            } else {
                return user
            }
        })
        .then(user => {
            const payload = {email:user.email, id: user.id}
            
            const access_token = generateToken(payload)
            console.log(access_token);
            return res.status(200).json({access_token})
        })
        .catch(err => {
            next(err)
            console.log(err);
        })
    }

}

module.exports = UserController