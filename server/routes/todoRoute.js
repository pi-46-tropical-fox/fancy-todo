const route = require('express').Router()
const todoController = require('../controllers/todoController.js')

route.get('/', todoController.show)
route.post('/create', todoController.createTodo)
route.put('/update/:id', todoController.updateTodo)
route.delete('/delete/:id', todoController.deleteTodo)

module.exports = route