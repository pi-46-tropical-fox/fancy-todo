const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const bcrypt = require('bcrypt')

class UserController {

  static async register(req, res) {
    const { username, email, password } = req.body;

    User.create({ username, email, password })
      .then(user => {
        const { username, email } = user
        res.status(201).json({ username, email })
      })
      .catch(err => {
        res.status(500).json({ message: "internal error server" })
      })
    // try {
    //   const user = await User.create({ username, email, password })
    //   const { username, email } = user
    //   return res.status(201).json({username, email})
    // }
    // catch(err) {
    //   return res.status(500).json({ message: "internal error server" })
    // }
  }

  static login(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ where: { email } })
      .then(email => {
        if (!email) {
          return res.status(400).json({ message: "Invalid email/password" })
        }
        return email;
      })
      .then(user => {
        console.log(user.password, password, '<<< password');
        const isValid = bcrypt.compareSync(password, user.password)

        if (isValid) {
          
          const access_token = generateToken(user);

          return res.status(200).json({ access_token })

        } else {
          return res.status(400).json({ message: "Invalid email/password" })
        }
      })
      .catch(err => {
        console.log(err, '<< error login');
        res.status(500).json({ message: "internal error server" })
      })
  }
}

module.exports = UserController;