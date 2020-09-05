const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')

class UserController {

    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const newUser = await User.create({email, password})

            return res.status(201).json({
                email: newUser.email,
            })
        } 
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static login(req, res, next) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(data =>{
            if(data){
                let hasValid = comparePassword(req.body.password, data.password)
                if(hasValid){
                    const access_token = generateToken(data)
                    return res.status(200).json({access_token})
                }
                else{
                    throw {name: 'INVALID_EMAIL/PASSWORD', statusCode: 400}
                }
            }
            else{
                throw {name: 'INVALID_EMAIL/PASSWORD', statusCode: 400}
            }
        })

        .catch(err =>{
            next(err)
        })
    }

    static googleSign(req, res, next) {

        const client = new OAuth2Client(process.env.CLIENT_ID)
        const { google_access_token } = req.body
        let email_google;
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
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