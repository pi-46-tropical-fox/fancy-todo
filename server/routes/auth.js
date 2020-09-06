const route = require('express').Router()
const controller = require('../controllers/UserController')

route.post('/register', controller.register)
route.post('/login', controller.login)
route.post('/googleLogin', controller.googleLogin)

module.exports = route