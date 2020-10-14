const { User } = require ('../models')
const { generateToken } = require('../helpers/jwt')
const { validateUser } = require('../helpers/validateUser')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register (req,res,next) {
        const { username, email, password } = req.body

        User.create({username, email, password})
            .then(user => {
                const { username, email } = user
                res.status(201).json({username, email})
            })
            .catch(err => {
                // console.log(err)
                return next(err)
            })
    }

    static login (req,res, next) {
        const {email, password} = req.body

        User.findOne({where : { email }})
            .then( user => {
                if (!user) {
                    throw { message : "Invalid username or password" , statusCode : 400}
                }
                return user
            })
            .then(user => {
                const isValid = validateUser(password, user.password)
                
                if (isValid) {
                    const access_token = generateToken(user)
                    return res.status(200).json({access_token , username: user.username})
                } else {
                    throw { message : "Invalid username or password" , statusCode : 400}
                }
            })
            .catch( err => {
                return next(err)
            })
    }

    static googleLogin (req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const { google_token } = req.headers
        const data = {} 

        client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            return payload
        })
        .then(payload => {
            
            data.username = payload.name
            data.email = payload.email
            data.password = 'random123'
            
            return User.findOne({where : { email : data.email}})
        })
        .then ( user => {
            if(!user) {
                return User.create(data)
            } else {
                return user
            }
        })
        .then ( user => {
            const access_token = generateToken(user)
            return res.status(200).json({access_token, username: user.username})
        })
        .catch( err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = UserController