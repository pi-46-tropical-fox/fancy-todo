const { User, Todo } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {comparePassword} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt');
//const user = require('../models/user');

class UserController {

  static register(req, res, next){

    const { email, password } = req.body;
    
    User.findOne({where:{email}})
    .then(data =>{
      if(!data) {
        User.create({ email, password })
          .then(data => {
            return res.status(201).json(data);
          })
          .catch(err => {
           // console.log(err);
            return next(err)
          })
      } else {
        const err = {
          name: "Duplicate Data",
          message: "Email already in use"
        }
        return next(err)
      }
    })
    .catch(err => {
      next(err);
    })
  }

//respond acces_token
  static login(req, res, next){
    const {email, password} = req.body
    //console.log('aa');
    User.findOne({where: {email}})
    .then(data => {
      const compare = comparePassword(password, data.password)
      if(compare){
        //const secret = 'kepoluuu'
        let token = generateToken(req.body)
        res.status(200).json({token})
      }
    })
    .catch(err =>{
      return next(err)
    })
  }
  

}

module.exports = UserController