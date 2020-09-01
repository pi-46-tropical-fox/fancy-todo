const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const bcrypt = require('bcrypt')

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
}

module.exports = UserController;