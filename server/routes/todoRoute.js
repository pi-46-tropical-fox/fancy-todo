const route = require('express').Router()
const todoController = require('../controllers/todoController.js')

route.get('/', todoController.show)
// route.get('/', todoController.myTodo)

module.exports = route