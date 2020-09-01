"use strict"

const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


function generateToken(user){
    const access_token = jwt.sign({
        email:user.email, id:user.id}, secret);
        return access_token
}

function verifyToken(token){
    const verified = jwt.verify(token, secret)
    return verified
}

module.exports= {generateToken, verifyToken}