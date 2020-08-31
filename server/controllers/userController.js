const {User} = require("../models")
const bcrypt = require('bcryptjs');
const {generateToken, verifyToken} = require("../helpers/generateUserToken");
class UserController{
  static async register(req, res){
    const {username, email, password} = req.body
    try{
      
      await User.create({username, email, password})
      return res.status(201).json({username, email})
    } catch (err) {

      if (err.errors[0].path === "username"){
        return res.status(400).json({message: "Username telah digunakan"})
      }else if(err.errors[0].path === "email"){
        return res.status(400).json({message: "Email telah digunakan"})
      }else if (err.errors[0].type === 'Validation error'){
        return res.status(400).json({message: err.errors[0].message})
      }else{
        return res.status(500).json({message: err.message})

      }

    }
  }

  static async login (req, res){
    const {username, password} = req.body

    try {
      let userData = await User.findOne({where: {username}})
      if (!userData) {
        return res.status(400).json({message: "username/password salah"})
      }else {
        console.log(userData, password)
        let isValid = bcrypt.compareSync(password, userData.password)
        if (isValid){
          let access_token = generateToken(userData)
          return res.status(200).json({access_token})
        } else {
          return res.status(400).json({message: "username/password salah"})
        }
      }
    } catch(err){
      console.log(err)
      return res.status(500).json({message: err.message})
    } 
    
  }
}

module.exports = UserController;