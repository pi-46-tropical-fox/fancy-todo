"use strict"

const routes = require('express').Router();
const Controller = require('../controller/UserController')
const todoRoutes = require('./todo')

routes.use('/todo', todoRoutes)
routes.get('/', (req, res)=>{
    return res.status(200).json({msg:"Move On !"})
})
routes.post('/register', Controller.register)
routes.post('/login', Controller.login)


module.exports = routes