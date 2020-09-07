const {User} = require('../models');
const {comparePassword} = require("../helpers/hashPassword");
const {generateToken} = require('../helpers/generateJWT');
const {OAuth2Client} = require('google-auth-library');



class UserController {
    
    static async register(req,res,next) {
        
        const {email,password} = req.body
        try {
            let data = await User.create({email,password})
            res.status(201).json({id:data.id,email:data.email})
        } catch (err) {
            
            return next(err)
        }
    }

    static async login (req,res,next) {
        
        const {email,password} = req.body
        try {
            let data = await User.findOne({where: {email}})
            if(!data) {
                throw {message: "Invalid username or password", statusCode: 400}
                // res.status(400).json({message: "email/password wrong"})
            } else {
                // res.send(200).json(data)
                let isValid = comparePassword(password, data.password)
                if(isValid) {
                    let acces_token = generateToken(data)
                    res.status(200).json({acces_token})
                } else {
                    throw {message: "Invalid username or password", statusCode: 400}
                    // res.status(400).json({message:"email/pasword wrong"})
                }
            }
        } catch (err) {
            // res.status(500).json({message:err.message})
            return next(err)
        }
    }

    static googleLogin(req,res,next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const {google_access_token} = req.headers

        let email_google = ""
        let profile_picture = ""
        
        client
        .verifyIdToken({
            idToken : google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            console.log(payload)
            email_google = payload.email
            profile_picture = payload.picture;
            return User.findOne({where:{email:payload.email}})
        })
        .then(user => {
            if(!user) {
                const userObj = {
                    email:email_google,
                    password:"randomaja"
                }
                return User.create(userObj)
            } else {
                return user
            }
        })
        .then(user => {
           const payload = {email:user.email,id:user.id}
           const acces_token = generateToken(payload) 

           return res.status(200).json({acces_token,avatar:profile_picture,email:email_google})
        })
        .catch(err => {
            console.log(err)
        })
    }
    
}

module.exports = UserController
