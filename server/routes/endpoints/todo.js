const todo = require('express').Router()
const TodoController = require('../../controllers/TodoController')
const { authorize } = require('../../middleware/authHandler')

todo
.get('/', TodoController.readAll)
.get('/:id', authorize, TodoController.readOne)
.post('/', TodoController.create)
.put('/:id', authorize, TodoController.update)
.delete('/:id', authorize, TodoController.delete)

module.exports = todo