const TodoController = require('../controller/todo')
const UserController = require('../controller/user')
const tokenAuth = require('../middleware/tokenAuth')
const route = require('express').Router()


route.get('/',(req,res)=>{
    res.send('hello')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)


route.get('/todo', tokenAuth, TodoController.getTodoList)
route.post('/todo', tokenAuth, TodoController.createTodo)

route.get('/todo/:id',TodoController.getTodoById)
route.put('/todo/:id',TodoController.updateTodo)

route.delete('/todo/:id',TodoController.deleteTodo)



module.exports = route