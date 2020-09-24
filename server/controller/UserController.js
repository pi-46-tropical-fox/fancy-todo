const { User, Todo } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {comparePassword} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt');
const {OAuth2Client} = require('google-auth-library')

class UserController {

  static register(req, res, next){

    const { email, password } = req.body;    
        User.create({ email, password })
          .then(data => {
            return res.status(201).json(data);
          })
          .catch(err => {
            console.log(err);
            return next(err)
          })

  }

//respond acces_token
  static login(req, res, next){
    const {email, password} = req.body
    //console.log('aa');
    User.findOne({where: {email}})
    .then(data => {
      const compare = comparePassword(password, data.password)
      if(compare){
        //const secret = 'kepoluuu'
        let token = generateToken({email:data.email, id :data.id})
        res.status(200).json({token})
      }else{
        throw({message: "Invalid password or Email"})
      }
    })
    .catch(err =>{
      return next(err)
    })
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
        const token = jwt.sign({email: user.email, id: user.id}, process.env.secret)
        console.log(token);
        res.status(200).json({token})
    })
    .catch(err => console.log(err))

  }
}

module.exports = UserController
