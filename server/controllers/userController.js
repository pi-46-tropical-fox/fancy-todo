const {User} = require('../models');
const bcrypt = require('bcryptjs');
const {generateToken,verifyToken} = require('../helpers/generateJWT');


class UserController {
    
    static async register(req,res) {
        
        const {email,password} = req.body
        try {
            let data = await User.create({email,password})
            res.status(201).json({id:data.id,email:data.email})
        } catch (err) {
            if(err.errors[0].path === "email") {
                res.status(400).json({message: "Email telah digunakan"})
            } else if(err.errors[0].type === 'Validation Error') {
                res.status(400).json({message:err.errors[0].message})
            } else {
                res.status(500).json({message: err.message})
            }
        }
    }

    static async login (req,res) {
        
        const {email,password} = req.body
        try {
            let data = await User.findOne({where: {email}})
            if(!data) {
                res.status(400).json({message: "email/password wrong"})
            } else {
                // res.send(200).json(data)
                let isValid = bcrypt.compareSync(password, data.password)
                if(isValid) {
                    let acces_token = generateToken(data)
                    res.status(200).json({acces_token})
                } else {
                    res.status(400).json({message:"email/pasword wrong"})
                }
            }
        } catch (err) {
            res.status(500).json({message:err.message})
        }
    }
    
}

module.exports = UserController
