const route = require('express').Router()
const userController = require('../controllers/userController.js')


route.get('/', userController.register)
module.exports = route

