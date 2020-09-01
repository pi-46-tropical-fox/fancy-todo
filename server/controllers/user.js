'use strict'

const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs')
const { generateToken, verifyToken } = require('../helpers/jwt')

class UserController {
// Static method for register new "user" 
  static async register(req, res) {
    const { username, email, password } = req.body
    try {
      const newUser = await User.create({ username, email, password })
      return res.status(201).json({ username, email })
    } catch (err) {
      return res.status(500).json({ message : err.message })
    }
  }
// Static method for "user" login
  static async login(req, res) {
    const { email, password } = req.body
    try {
      const userLogin = await User.findOne({ where : { email }})
      if (!userLogin) {
          return res.status(400).json({ message : "Invalid email or password" })
      } else {
        console.log({ password });
        if (checkPassword(password, userLogin.password)) {
          const access_token = generateToken(userLogin)
          return res.status(200).json({ access_token })
        } else {
          return res.status(400).json({ message : "Invalid email or password" })
        }
      }
    } catch (err) {
      return res.status(500).json({ message : err.message })
    }
  }

}


module.exports = UserController