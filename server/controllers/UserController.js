const { User } = require('../models')
const bcrypt = require('bcryptjs')
const hashPassword = require('../helper/hashPassword')

class UserController { 
    static show(req,res){
        
    }

    static register(req,res){
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword(req.body.firstname),
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
        // res.send(req.body)
        // console.log(req.body)
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user=>{
            if(user){
                // console.log(, hashPassword(req.body.password))
                let check = bcrypt.compareSync(req.body.password,user.password)
                console.log(check)
                if(check){
                    let result = {
                        id: user.id,
                        username: user.username
                    }
                    res.status(200).json(result)
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