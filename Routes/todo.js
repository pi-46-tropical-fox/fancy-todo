const todoRoutes = require('express').Router()
const todoController = require('../Controller/TodoController')
const TodoController = require('../Controller/TodoController')


todoRoutes.post('/todos', TodoController.addTodo)

todoRoutes.get('/todos', TodoController.readAll)

todoRoutes.get('/todos/:id', TodoController.selectTodo)

todoRoutes.put('/todos/:id', TodoController.updateTodo)

todoRoutes.put('/todos/:id', (req,res) => {
    res.send('lov lov')
})

todoRoutes.delete('/todos/:id', TodoController.deleteTodo)


module.exports = todoRoutes