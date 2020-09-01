const {User} = require("../models")
const bcrypt = require('bcryptjs');
const {generateToken, verifyToken} = require("../helpers/userToken");
class UserController{
  static async register(req, res, next){
    try{
      const {username, email, password} = req.body
      
      let userData = await User.create({username, email, password})
      return res.status(201).json({
        username: userData.username,
        email: userData.email,
      })
    } catch (err) {

      next(err)

    }
  }

  static async login (req, res, next){
    const {username, password} = req.body

    try {
      let userData = await User.findOne({where: {username}})
      if (!userData) {
        let error = Error ()
        error.name = "400"
        error.message= "cannot find matches username/password on database"
        throw error
      }else {
        let isValid = bcrypt.compareSync(password, userData.password)
        if (isValid){
          let access_token = generateToken(userData)
          return res.status(200).json({access_token})
        } else {
          let error = Error ()
          error.name = "400"
          error.message= "cannot find matches username/password on database"
          throw error
        }
      }
    } catch(err){

      next(err)

    } 
    
  }
}

module.exports = UserController;