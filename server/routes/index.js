const route = require('express').Router()
const TodoController = require('../controllers/TodoController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')


// Register & Login
route.post('/register', UserController.register)
route.post('/login', UserController.login)


// Create
route.post('/todos', authentication, TodoController.createTodo)
// Read
route.get('/todos', authentication, TodoController.showTodo)
// Update
route.get('/todos/:id', authentication, authorization, TodoController.showTodoById)
route.put('/todos/:id', authentication, authorization, TodoController.updateTodo)
// Delete
route.delete('/todos/:id', authentication, authorization, TodoController.deleteTodo)



module.exports = route