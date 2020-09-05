const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const bcrypt = require('bcrypt')
//verify google login
const {OAuth2Client} = require('google-auth-library');
class UserController {

  static register(req, res, next) {
    const { name, email, password } = req.body;

    User.create({ name, email, password })
      .then(user => {
        const { name, email, id } = user
        res.status(201).json({name, email, id})
      })
      .catch(err => {
          return next(err)
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          throw {message: 'invalid name / password', statusCode: 400}
        }
        return user;
      })
      .then(user => {
        const isValid = bcrypt.compareSync(password, user.password)

        if (isValid) {
          
          const access_token = generateToken(user);

          return res.status(200).json({ access_token })

        } else {
          throw {message: 'invalid name / password', statusCode: 400}
        }
      })
      .catch(err => {
        return next(err)
      })
  }
  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const {google_access_token} = req.headers
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then(ticket => {
      return payload = ticket.getPayload();
    })
    .then(payload => {
      console.log(payload);
      // email = payload.email
      // return User.findOne({
      //   where: { email }
      // })
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = UserController;