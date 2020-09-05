const auth = require('express').Router()
const AuthController = require('../../controllers/AuthController')

auth
// .get('/login', AuthController.loginForm)
.post('/login', AuthController.login)
.post('/register', AuthController.register)
.post('/googleLogin', AuthController.googleLogin)

module.exports = auth