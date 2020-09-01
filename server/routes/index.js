const route = require('express').Router()
const TodoController = require('../controllers/TodoController')
const UserController = require('../controllers/UserController')


// Register & Login
route.post('/register', UserController.register)
route.post('/login', UserController.login)
// Create
route.post('/todos', TodoController.createTodo)
// Read
route.get('/todos', TodoController.showTodo)
// Update
route.get('/todos/:id', TodoController.showTodoById)
route.put('/todos/:id', TodoController.updateTodo)
// Delete
route.delete('/todos/:id', TodoController.deleteTodo)



module.exports = route