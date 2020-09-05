const { User } = require('../models')
const { compareHashes } = require('../helpers/bcrypt')
const { generateToken, verifyToken }  = require('../helpers/jwt')

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '360618096035-a5q6u0qccpe42ucf0rsvf14387mpg3qg.apps.googleusercontent.com'

class Controller{
    static async register(req,res, next){
        let params = {
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        }
        try {
            let user = await User.create(params)
            let { id, email, username } = user
            return res.status(201).json({id, email, username})
        } catch (error) {
            // console.log(error)
            // return res.status(400).json({message:'bad request'})
            return next(error)
        }
    }

    static async login(req,res,next){
        let {email, password} = req.body
        try {
            let user = await User.findOne({where:{email}})
            if(!user){
                // return res.status(401).json({message: "invalid email or password"})
                throw {message: "invalid email or password", statusCode: 400}
            }else{
                console.log(user)
                if(compareHashes(password,user.password)){
                    const access_token = generateToken(email, user.id)
                    console.log(access_token, 'ini token')
                    return res.status(200).json({access_token})
                }else{
                    // return res.status(401).json({message:'invalid email or password'})
                    throw {message: "invalid email or password", statusCode: 400}
                }
            }

        } catch (error) {
            // return res.status(500).json(error)
            return next(error)
        }
    }

    static googleLogin(req,res,next){
        const client = new OAuth2Client(CLIENT_ID);
        const {google_access_token} = req.headers
        let email_google = ''
        client.verifyIdToken({
                idToken: google_access_token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket =>{
            return ticket.getPayload()
        })
        .then(payload =>{
            console.log(payload)
            email_google = payload.email
            return User.findOne({where:{email: payload.email}})
        })
        .then(user =>{
            if(!user){
                var userObj = {
                    email: email_google,
                    password: 'secret'
                }
                return User.create(userObj)
            }else{
                return user
            }
        })
        .then(user =>{
            const payload = { email: user.email, id:user.id}
            const access_token = generateToken(payload)

            return res.status(200).json({access_token})
        })
        .catch(err =>{
            console.log(err)
        })
        // const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // // If request specified a G Suite domain:
        // // const domain = payload['hd'];
        // verify().catch(console.error);
        }
    }


module.exports = Controller