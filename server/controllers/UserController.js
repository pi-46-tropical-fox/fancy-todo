const { User, Todo } = require("../models");
// const bcrypt = require("bcryptjs");
const { hashPassword, checkPassword } = require("../helpers/bcrypt.js");
const { generateToken, verifyToken } = require("../helpers/jwt.js");

// verify google login
const { OAuth2Client } = require('google-auth-library');

class UserController {

  static async register(req, res, next) {
    try {
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };
      const user = await User.create(newUser);
      // return res.status(201).json({ username: user.username, email: user.email });
      const access_token = generateToken(user);
      return res.status(201).json({ access_token: access_token, email: user.email });
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
        return res.status(200).json({ access_token: access_token, email: user.email });
      } else {
        throw { message: "Invalid email or password", statusCode: 400 };
      }
    } catch(err) {
      console.log("<<<< error in login UserController");
      return next(err);
    }
  }

  static async googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const { google_access_token } = req.headers;
    try {
      const ticket = await client.verifyIdToken({
        idToken: google_access_token,
        audience: process.env.CLIENT_ID
      });

      const payload = ticket.getPayload();
      console.log(payload);

      const getUserName = payload.name.trim().split(" ").join("_");
      const email_google = payload.email;
      const profile_picture = payload.picture;

      const user = await User.findOne({
        where: {
          email: payload.email
        }
      });

      if (!user) {
        const userObj = {
          username: getUserName,
          email: payload.email,
          password: "kurangtidur"
        };
        const addUser = await User.create(userObj);
      } else {
        const access_token = generateToken(user);
        return res.status(200).json({ access_token, avatar: profile_picture, email: email_google });
      }
    } catch (err) {
      return next(err);
    }

  }
}

module.exports = UserController;