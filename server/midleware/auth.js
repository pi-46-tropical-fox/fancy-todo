'use strict'
const {User}= require('../models')
const { verifyToken } = require('../helper/jwt')
const jwt = require('jsonwebtoken')


const authentication = (req, res, next) =>{
    try {
        if (req.headers.access_token) {
            let verify = verifyToken(req.headers.access_token)
            console.log(verify);
            User.findByPk(verify.id)
                .then(user => {
                    if(!user){
                        throw  ({message:'User Not Found'});
                    }else{
                    req.UserId = user.id
                    next()
                    }
                })
                .catch (err =>{
                   console.log(err);
                    return res.status(404).json(err)
                    //next(err)
                  //console.log(err);
                })
        } else {
           // console.log(err);
            throw ({message:'Token Is Required'})
        }
    } 
    catch (err) {
      console.log(err);
        next (err)
    }
}

const authoritzation = (req, res, next) =>{
    const id = req.params.id
    Todo.findByPk(id)
        .then(data => {
            if (data.UserId === req.UserId) {
                return next()
            } else {
                throw err
            }
        })
        .catch(err => {
            next (err)
        })

}


module.exports = {authentication, authoritzation}