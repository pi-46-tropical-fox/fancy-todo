const userRoutes = require('express').Router()
const UserController = require('../Controller/UserController')


userRoutes.post('/register', UserController.registerPost)
userRoutes.post('/login', UserController.loginPost)

userRoutes.post('/googleLogin', UserController.googleLogin)

module.exports = userRoutes