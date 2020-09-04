const { User } = require('../models')
const comparePassword = require('../Helpers/bcrypt')
const { generateToken } = require('../Helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static registerPost(req, res, next) {
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(userObj)
            .then(data => {
                const { id, name, email } = data
                return res.status(200).json({ id, name, email })
            })
            .catch(err => {
                console.log(err, '<<<< err controller')
                console.log(err.name, '<<< err name')
                return next(err)
            })

    }

    static loginPost(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(!data) {
                    // return res.status(400).json({message: 'invalid name password'})
                    throw {message: 'Invalid name or password', statusCode: 400}
                }

                const flag = comparePassword(req.body.password, data.password)

                if(flag) {
                    const token = generateToken(data)
    
                    return res.status(200).json({token})
                }else {
                    throw {message: 'Invalid name or password', statusCode: 400}
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const {google_access_token} = req.headers
        let email_google = ''
        let name_google = ''

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            return ticket.getPayload();
        })
        .then(payload => {
            console.log('payload>>>>', payload, '<<<payload')
            email_google = payload.email
            name_google = payload.name
            return User.findOne({
                where: {
                    email: email_google
                }
            })
        })
        .then(user => {
            if(!user) {
                let objUser = {
                    name: name_google,
                    email: email_google,
                    password: 'passgoogle'
                }

                return User.create(objUser)
            }else {
                return user
            }
        })
        .then(user => {
            const token = generateToken(user)
            
            return res.status(200).json({token})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

}

module.exports = UserController