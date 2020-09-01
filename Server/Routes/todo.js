const todoRoutes = require('express').Router()
const TodoController = require('../Controller/TodoController')
const { authentication, authorization } = require('../Middlewares/auth')

// Create Todo
todoRoutes.post('/todos', authentication, TodoController.addTodo)

//Show All Todo List
todoRoutes.get('/todos', authentication, TodoController.readAll)

//Select Todo list Owned by UserId
todoRoutes.get('/todos/:id', authentication, authorization, TodoController.selectTodo)

//Update Todo list Owned by UserId
todoRoutes.put('/todos/:id', authentication, authorization, TodoController.updateTodo)

//Delete Todo list Owned by UserId
todoRoutes.delete('/todos/:id', authentication, authorization, TodoController.deleteTodo)


module.exports = todoRoutes