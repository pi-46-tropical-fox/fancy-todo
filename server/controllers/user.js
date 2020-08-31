'use strict'

const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
// Static method for register new "user" 
  static register(req, res) {
    const { username, email, password } = req.body
    User.create({ username, email, password })
      .then(user => {
        const { username, email } = user
        return res.status(201).json({ username, email })
      })
      .catch(err => {
        return res.status(500).json({ message : err.message })
      })
  }
// Static method for "user" login
  static login(req, res) {
    const { username, password } = req.body
    User.findOne({ where : { username } })
      .then(user => {
        if (!user) {
          return res.status(400).json({ message : "Invalid username or password" })
        } else {
          if (checkPassword(password, user.password)) {
            const secret = 'thisismydeepestsecret'
            const access_token = jwt.sign({ username: user.name, id: user.id }, secret)
            return res.status(200).json({ access_token })
          } else {
            return res.status(400).json({ message : "Invalid username or password" })
          }
        }
      })
      .catch(err => {
        return res.status(500).json({ message : err.message })
      })
  }

}


module.exports = UserController