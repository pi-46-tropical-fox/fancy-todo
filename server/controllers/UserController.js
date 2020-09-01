const { User, Todo } = require("../models");
// const bcrypt = require("bcryptjs");
const { hashPassword, checkPassword } = require("../helpers/bcrypt.js");
const { generateToken, verifyToken } = require("../helpers/jwt.js");

class UserController {

  static async register(req, res, next) {
    try {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };
      const user = await User.create(newUser);
      return res.status(201).json({ username: user.username, email: user.email });
    } catch(err) {
      console.log("<<<< error in register UserController");
      return next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        throw { message: "Invalid email or password", statusCode: 400 };
      }
      const isValid = checkPassword(req.body.password, user.password);
      if (isValid) {
        // generate access token
        const access_token = generateToken(user);
        return res.status(200).json({ access_token });
      } else {
        throw { message: "Invalid email or password", statusCode: 400 };
      }
    } catch(err) {
      console.log("<<<< error in register UserController");
      return next(err);
    }
  }

}

module.exports = UserController;