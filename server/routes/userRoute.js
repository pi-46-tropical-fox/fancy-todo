const route = require('express').Router()
const userController = require('../controllers/userController.js')
const googleLoginController = require('../controllers/googleLoginController')
const { verifyLogin } = require('../controllers/googleLoginController')


route.post('/register', userController.register)
route.post('/login', userController.login)
route.post('/google-login', verifyLogin)

module.exports = route

