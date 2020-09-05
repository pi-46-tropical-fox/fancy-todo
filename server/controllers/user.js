'use strict'

const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
// Static method for register new "user" 
  static async register(req, res, next) {
    const { username, email, password } = req.body
    
    try {
      const newUser = await User.create({ username, email, password })
      return res.status(201).json({ username, email })
    } catch (err) {
      next (err)
    }
  }
// Static method for "user" login
  static async login(req, res, next) {
    // console.log(data);
    // console.log('HIT');
    const { email, password } = req.body
    
    try {
      const userLogin = await User.findOne({ where : { email }})
      console.log(userLogin);
      if (!userLogin) {
        throw { message : "Invalid email or password", statusCode: 400 }
      } else {
        if (checkPassword(password, userLogin.password)) {
          const access_token = generateToken(userLogin)
          return res.status(200).json({ access_token })
        } else {
          throw { message : "Invalid email or password", statusCode: 400 }
        }
      }
    } catch (err) {
      next (err)
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
      // console.log(payload);
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