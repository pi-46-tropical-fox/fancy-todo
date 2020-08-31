const todo = require('express').Router()
const TodoController = require('../../controllers/TodoController')

todo
.get('/', TodoController.readAll)
.post('/create', TodoController.create)
.put('/update/:id', TodoController.update)
.delete('/delete/:id', TodoController.delete)

module.exports = todo