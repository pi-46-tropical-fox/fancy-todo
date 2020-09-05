const todoRoutes = require('express').Router()
const TodoController = require('../Controller/TodoController')
const { authentication, authorizationTitle } = require('../Middlewares/auth')

// Create Todo
todoRoutes.post('/todos', authentication, TodoController.addTodo)

//Show All Todo List
todoRoutes.get('/todos', authentication, TodoController.readAll)

//Select Todo list Owned by UserId
todoRoutes.get('/todos/:title', authentication, TodoController.selectTodo)

//Update Todo list Owned by UserId
todoRoutes.put('/todos/:title', authentication, TodoController.updateTodo)

//Delete Todo list Owned by UserId
todoRoutes.delete('/todos/:title', authentication, authorizationTitle, TodoController.deleteTodo)


module.exports = todoRoutes