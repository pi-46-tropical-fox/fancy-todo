const { User } = require('../models')
const {hashPassword, checkPassword} = require('../helpers/password')
const {generateToken, verifyToken} = require('../helpers/jwt')

class UserController { 
    static show(req,res){
        
    }

    static register(req,res){
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(user=>{
            const result = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err.errors[0].message === 'username must be unique'){
                res.status(500).json({"msg": "Username Already Exists"})
            }else if(err.errors[0].message === 'email must be unique'){
                res.status(500).json({"msg": "Email Already Exists"})
            }else{
                let error = [err.errors[0].message]
                res.status(400).json(error)
            }
        })
    }

    static login(req,res){
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user=>{
            if(user){
                let check = checkPassword(req.body.password,user.password)
                console.log(check)
                if(check){
                    let token = generateToken(user)
                    // verifyToken(token)
                    res.status(200).json({token})
                }else{
                    res.status(400).json({"msg": "username or password is wrong"})
                }
            }else{
                res.status(400).json({"msg": "username or password is wrong"})
            }
        })
        .catch(err=>{
            res.status(500).json({"msg": "Server Error"})
            console.log(err)
        })
    }
}

module.exports = UserController