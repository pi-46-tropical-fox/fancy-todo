const { User, Todo } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const compared = require('../helper/bcrypt')

class UserController {

  static register(req, res, next){
    const { email, password } = req.body;
    
    User.create({ email, password })
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(err => {
        return console.log(err);
        
      })
      
  }

//respond acces_token
  static login(req, res, next){
    const {email, password} = req.body
    //console.log('aa');
    User.findOne({where: {email}})
    .then(data => {
      const compare = compared(password, data.password)
      if(compare){
        const secret = 'kepoluuu'
        let token = jwt.sign({email: data.email}, secret)
        res.status(200).json({token})
      }
    })
    .catch(err =>{
      return next(err)
    })
  }
  

}

module.exports = UserController