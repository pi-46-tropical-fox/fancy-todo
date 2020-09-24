"use strict"

const routes = require('express').Router();
const Controller = require('../controller/UserController')
// const ThirdParty = require('../controller/thirdPartyController')
const todoRoutes = require('./todo')
const QuotesController = require('../controller/QuotesController')
const {authentication, authoritzation} = require('../midleware/auth')


routes.get('/', (req, res)=>{
    return res.status(200).json({msg:"Move On !"})
    // res.redirect('/login')
})

routes.post('/register', Controller.register)
routes.post('/login', Controller.login)
routes.post('/googlelogin', Controller.googleLogin)

// routes.get('/hero', ThirdParty.getInfo)
routes.get('/quotes', QuotesController.getQuote)
routes.use(authentication)
routes.use('/todos', todoRoutes)



module.exports = routes