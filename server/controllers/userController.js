const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async register(req, res, next) {
        const {username, email, password} = req.body
        try {
            const user = await User.create({username, email, password})
            return res.status(201).json({username, email})
        } catch(err) {
            return next(err)
        }
    }
    static async login (req, res, next) {
        const {email, password} = req.body
        try {
            const user = await User.findOne({where: { email }})
            if (!user) {
                // return res.status(400).json({message: "Invalid Email"})
                throw {message: "Invalid Email", statusCode: 400}
            }
            const isValid = comparePassword(password, user.password)
            if(isValid) {
                const access_token = generateToken({email: user.email, id: user.id})
                return res.status(200).json({access_token})
            } else {
                // return res.status(400).json({message: "Invalid Password"})
                throw {message: "Invalid Password", statusCode: 400}
            }
        } catch(err) {
            // return res.status(500).json({message: err.message})
            return next(err)
        }
    }
    static googleLogin(req, res) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const {google_access_token} = req.headers
        let email_google ='';
        let given_name='';
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then (payload => {
            email_google = payload.email
            given_name = payload.given_name
            return User.findOne({where: {email: payload.email}})
        })
        .then (user => {
            if (!user) {
                const obj = {
                    username: given_name,
                    email: email_google,
                    password: 'random'
                }
                return User.create(obj)
            }
            else {
                return user;
            }
        })
        .then(user => {
            const payload = {email: user.email, id:user.id}
            const access_token =  generateToken(payload)
            return res.status(200).json({access_token})
        })
        .catch(err => {
            return res.status(500).json({message: err.message})
        })
    }
}

module.exports = UserController