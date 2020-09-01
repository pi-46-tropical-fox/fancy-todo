const route = require('express').Router()
const todoController = require('../controllers/todoController.js')
const { authentication, authorization} = require('../middlewares/auth')

route.get('/', todoController.show)
// route.get('/', todoController.myTodo)
route.post('/create', authentication, todoController.createTodo)
route.put('/update/:todoId', authentication, authorization, todoController.updateTodo)
route.delete('/delete/:todoId', authentication, authorization, todoController.deleteTodo)

module.exports = route