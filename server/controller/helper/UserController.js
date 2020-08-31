const { User, Todo } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {

  static register(req, res){
    const { email, password } = req.body;

    User.create({ email, password })
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(err => {
        return res.status(400).json(data)
      })
  }

  static login(req, res){

  }
  

}

module.exports = UserController