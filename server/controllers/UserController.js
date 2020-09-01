const { User } = require('../models')
const {checkPassword} = require('../helpers/password')
const {generateToken} = require('../helpers/jwt')

class UserController { 
    static show(req,res){
        
    }

    static register(req,res, next){
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
            next(err)
        })
    }

    static login(req,res, next){
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user=>{
            if(user){
                let check = checkPassword(req.body.password,user.password)
                if(check){
                    let token = generateToken(user)
                    res.status(200).json({token})
                }else{
                    throw {message: "Invalid Username or Password", statusCode: 400}
                }
            }else{
                throw {message: "Invalid Username or Password", statusCode: 400}
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserController