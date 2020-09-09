const todo = require('express').Router()
const TodoController = require('../../controllers/TodoController')

todo
.get('/', TodoController.readAll)
.get('/:id', TodoController.readOne)
.post('/', TodoController.create)
.put('/:id', TodoController.update)
.delete('/:id', TodoController.delete)

module.exports = todo