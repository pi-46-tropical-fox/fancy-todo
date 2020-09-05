const UserController = require('../controllers/UserController')
const route = require('express').Router()

route.get('/', UserController.show)
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)

module.exports = route