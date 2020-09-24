const {User} = require('../models')
const {generateToken} = require('../helper/jwt')
const compare = require('../helper/compare')
const {OAuth2Client} = require('google-auth-library');


require('dotenv').config()

class Controller{
    static register(req,res,next){
        let user = {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }
        let hidePass = {
            username:req.body.username,
            email:req.body.email,
        }
        User.create(user)
        .then(data=>{
            console.log(data)
            return res.status(201).json(hidePass)
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req,res,next){
        let options = {where:{email:req.body.email}}
        User.findOne(options)
        .then(data=>{
            if (data){
                let isValid = compare(req.body.password, data.password)
                if (isValid){
                    const access_token = generateToken(data)
                    console.log(data)
                    return res.status(200).json({access_token})

                }else{
                    throw ({message:`email / password salah`,status:400})    
                }

            } else{
                throw ({message:`email / password salah`,status:400})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static google (req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const { google_access_token } = req.headers
        let emailGoogle = ''
        let googleUser = ''
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket=>{
            return ticket.getPayload()
        })
        .then(payload=>{
            console.log(payload)
            emailGoogle = payload.email
            googleUser = payload.username
            return User.findOne({where:{email:payload.email}})
        })
        .then(user=>{
            if(!user){
                let params = {
                    email:emailGoogle,
                    username:googleUser,
                    password:'random'
                }
                return User.create(params)
            } else{
                return user
            }
        })
        .then(user=>{
            const payload = {email:user.email,id:user.id}
            const token = generateToken(payload)

            return res.status(200).json({access_token:token})
        })
        .catch(err =>{
            console.log(err)
        })
            
    }
}

module.exports = Controller