const { User, Todo } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {

  static register(req, res){
    const { email, password } = req.body;

    User.create({ email, password })
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json(err)
      })
      
  }

//respond acces_token
  static login(req, res){
    const {email, password} = req.body
    
    User.findOne({where: {email}})
    .then(data => {
      const compare = bcrypt.compareSync(password, data.password)
      if(compare){
        const secret = 'kepoluuu'
        let token = jwt.sign({email: data.email}, secret)

        res.status(200).json({token})
      }
    })
    .catch(err =>{
      return res.status(400).json(err)
    })
  }
  

}

module.exports = UserController