const route = require('express').Router()
const MyTodoController = require('../controllers/myTodoController.js')
const { authentication, authorization} = require('../middlewares/auth')

route.get('/', authentication, MyTodoController.show)
route.post('/', authentication, MyTodoController.createTodo)
route.put('/:idTodo', authentication, authorization, MyTodoController.updateTodo)
route.put('/complete/:idTodo', authentication, authorization, MyTodoController.completeTodo)
route.delete('/:idTodo', authentication, authorization, MyTodoController.deleteTodo)

module.exports = route