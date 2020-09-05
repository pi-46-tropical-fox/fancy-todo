require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../helper/bcrypt');
const client = new OAuth2Client(process.env.LoginClientId);

class GoogleController {
  static loginGoogle(req, res) {
    let token = req.body.token;
    let userData = {};
    client.verifyIdToken({
      idToken: token,
      audience: process.env.LoginClientId
    })
      .then(data => {
        const payload = data.getPayload();
        userData.email = payload.email;
        userData.password = hashPassword('default');
        return User.findOne({
          where: {
            email: payload.email
          }
        })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create(userData)
        }
      })
      .then(theUser => {
        const token = jwt.sign({
          UserEmail: theUser.email,
          UserId: theUser.id
        }, process.env.TokenKey)
        res.status(200).json({
          access_token: token
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = GoogleController