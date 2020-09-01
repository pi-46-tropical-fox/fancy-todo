const route = require('express').Router()
const MyTodoController = require('../controllers/myTodoController.js')
const { authentication, authorization} = require('../middlewares/auth')

route.post('/', authentication, MyTodoController.createTodo)
route.put('/:todoId', authentication, authorization, MyTodoController.updateTodo)
route.delete('/:todoId', authentication, authorization, MyTodoController.deleteTodo)

module.exports = route