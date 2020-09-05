'use strict'
const {User}= require('../models')
const { verifyToken } = require('../helper/jwt')
const jwt = require('jsonwebtoken')



const authentication = (req, res, next) => {
    //console.log('in authentication');
    const {token} = req.headers
    //console.log(req.headers);
    const data = verifyToken (token)
    //console.log(data);
    User.findByPk (data.id)
    .then ( result => {
        req.UserData = result
        next ()
    })
    .catch (err => {
        console.log(err, 'author');
        return res.status (401).json ({message : "Invalid User"})
    })
}

const authorization = (req, res, next) => {
    console.log('in authorization');
    const {id} = req.UserData
    User.findByPk (id)
    .then (data => {
        if (data && data.id === req.UserData.id ) {
            next ()
        } else {
            return res.status (403).json ({message : "Unauthorized Access"})
        }
    })
    .catch (err => {
        console.log(err, 'auuuut');
        return res.status (403).json ({message : "Unauthorized Access"})
    })
}


module.exports = {authentication, authorization}