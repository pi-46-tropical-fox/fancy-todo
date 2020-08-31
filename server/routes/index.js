const TodoController = require('../controller/todo')

const route = require('express').Router()

route.get('/',(req,res)=>{
    res.send('hello')
})

route.get('/todo',TodoController.getTodoList)
route.post('/todo',TodoController.createTodo)

route.get('/todo/:id',TodoController.getTodoById)
route.put('/todo/:id',TodoController.updateTodo)

route.delete('/todo/:id',TodoController.deleteTodo)



module.exports = route