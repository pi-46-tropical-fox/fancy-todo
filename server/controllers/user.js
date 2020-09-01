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
    const { email, password } = req.body

    try {
      const userLogin = await User.findOne({ where : { email }})
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

}


module.exports = UserController