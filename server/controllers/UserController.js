const { User, Todo } = require("../models");
// const bcrypt = require("bcryptjs");
const { hashPassword, checkPassword } = require("../helpers/bcrypt.js");
const { generateToken, verifyToken } = require("../helpers/jwt.js");

class UserController {

  static async register(req, res) {
    try {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };
      const user = await User.create(newUser);
      return res.status(201).json({ username: user.username, email: user.email });
    } catch(err) {
      if (err.name === "SequelizeValidationError") {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push(error);
        });
        return res.status(400).json({ message: "Bad Request", errors });
      }
      return res.status(500).json({ message: "Internal Server Error", errors: [ err.message ] });
    }
  }

  static async login(req, res) {
    try {
      const loggedUser = {
        email: req.body.email,
        password: req.body.password
      };
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const isValid = checkPassword(req.body.password, user.password);
      if (isValid) {
        // generate access token
        const access_token = generateToken(user);
        return res.status(200).json({ access_token });
      } else {
        res.status(400).json({ message: "Invalid email or password" });
      }
    } catch(err) {
      if (err.name === "SequelizeValidationError") {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push(error);
        });
        return res.status(400).json({ message: "Bad Request", errors })
      }
      return res.status(500).json({ message: "Internal Server Error", errors: [ err.message ] });
    }
  }

}

module.exports = UserController;