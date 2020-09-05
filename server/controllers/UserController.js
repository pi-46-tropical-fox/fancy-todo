const { User } = require('../models')
const {checkPassword} = require('../helpers/password')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController { 
    static show(req,res){
        
    }

    static register(req,res, next){
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(user=>{
            const result = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res, next){
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user=>{
            if(user){
                let check = checkPassword(req.body.password,user.password)
                if(check){
                    let token = generateToken(user)
                    res.status(200).json({token})
                }else{
                    throw {message: "Invalid Username or Password", statusCode: 400}
                }
            }else{
                throw {message: "Invalid Username or Password", statusCode: 400}
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static googleLogin (req,res,next){
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const {google_access_token} = req.headers
        let email_google
        let firstname_google
        let lastname_google
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            console.log(payload)
            email_google = payload.email
            firstname_google = payload.given_name
            lastname_google = payload.family_name
            return User.findOne({where:{email:payload.email}})
        })
        .then(user=>{
            if(!user){
                return User.create({
                    firstname: firstname_google,
                    lastname: lastname_google,
                    email: email_google,
                    password: 'password'
                })
            }else{
                return user
            }
        })
        .then(user=>{
            const payload = {email:user.email, id: user.id}
            const access_token = generateToken(payload)

            return res.status(200).json({access_token})
        })
        .catch(err=>{
            next(err)
            console.log(err)
        })
    }
}

module.exports = UserController