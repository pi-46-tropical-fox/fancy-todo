const route = require('express').Router()
const todoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middlewares/auth')

// get all todos
route.get('/', authentication, todoController.getAllTodos)
// post todo
route.post('/', authentication, todoController.postTodo)
route.get('/:id', authentication, todoController.getTodoById)

route.put('/:id', authentication, authorization, todoController.editTodoById)
route.delete('/:id', authentication, authorization, todoController.deleteTodo)

module.exports = route