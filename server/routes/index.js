const route = require('express').Router()
const todoController = require('../controllers/todoController.js')
const userController = require('../controllers/userController.js')

route.get('/', (req, res) => {
    res.send('home')
})

route.get('/todos', todoController.show)
route.post('/todos/create', todoController.createTodo)
route.put('/todos/update/:id', todoController.updateTodo)
route.delete('/todos/delete/:id', todoController.deleteTodo)

module.exports = route