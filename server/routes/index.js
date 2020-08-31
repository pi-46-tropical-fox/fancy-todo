const TodoController = require('../controller/todo')
const UserController = require('../controller/user')
const route = require('express').Router()


route.get('/',(req,res)=>{
    res.send('hello')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)


route.get('/todo',TodoController.getTodoList)
route.post('/todo',TodoController.createTodo)

route.get('/todo/:id',TodoController.getTodoById)
route.put('/todo/:id',TodoController.updateTodo)

route.delete('/todo/:id',TodoController.deleteTodo)



module.exports = route