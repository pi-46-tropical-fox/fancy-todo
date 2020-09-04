const {User} = require('../models/index')
const {OAuth2Client} = require('google-auth-library');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv')
require('dotenv').config()

const secret = process.env.SECRET

class UserController {
    static async register(req,res) {
        const params = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const registered = await User.create(params)
            res.status(201).json(registered)
        } catch (err) {
            next(err)
            // res.status(400).json(err)
        }
    }
    static async login(req,res) {
        // const { email,password } = req.body
        // console.log({email});
        try {
            const user = await User.findOne({where: {email: req.body.email }})
            // console.log(auth);
            if (user) {
                let auth = bcrypt.compareSync(req.body.password, user.password)
                if (auth) {
                    const accessToken = jwt.sign({email: user.email, id: user.id}, secret)
                    res.status(200).json({accessToken: accessToken})
                } else throw res.status(400).json('wrong username/password')
            } else {
                throw res.status(400).json('wrong username/password')
            }
            
        } catch (err) {
            // res.status(400).json(err)
            next(err)
        }
    }
    static googleLogin(req,res,next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const {google_access_token} = req.headers
        let email_google = ''
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            console.log(payload);
            email_google = payload.email
            return User.findOne({where:{email:payload.email}})
        })
        .then(user => {
            if (!user) {
                let params = {
                    email: email_google,
                    password: 'defaultgoogle'
                }
                return User.create(params)
            } else {
                return user
            }
        })
        .then(user => {
            const accessToken = jwt.sign({email: user.email, id: user.id}, secret)
            res.status(200).json({accessToken: accessToken})
        })
        .catch(err => console.log(err))

    }
}

module.exports = UserController