const userRoutes = require('express').Router()
const UserController = require('../Controller/UserController')
const { authentication } = require('../Middlewares/auth')


userRoutes.post('/register', UserController.registerPost)
userRoutes.post('/login', UserController.loginPost)


module.exports = userRoutes