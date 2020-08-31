const route = require('express').Router()
const todoController = require('../controllers/TodoController')

// get all todos
route.get('/', todoController.getAllTodos)
// post todo
route.post('/', todoController.postTodo)
route.get('/:id', todoController.getTodoById)

route.put('/:id', todoController.editTodoById)
route.delete('/:id', todoController.deleteTodo)

module.exports = route