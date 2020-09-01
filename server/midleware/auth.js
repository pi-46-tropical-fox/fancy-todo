'use strict'
const { verifyToken } = require('../helper/jwt')
const jwt = require('jsonwebtoken')


const authentication = (req, res, next) =>{
    console.log(req.headers, 'Ini HEADER');
    const {access_token} = req.headers
    
    try{
        const data = verifyToken(access_token)
        console.log(data, 'ini data');
        next()
    }

    catch(err){
        return res.status(401).json({message: 'User not auth'})
    }

}

const authoritzation = (req, res, next) =>{
    
}


module.exports = {authentication, authoritzation}