const TodoController = require('../controllers/TodoController')

const route = require('express').Router()

route.get('/', TodoController.show)
route.post('/', TodoController.add)
route.get('/:id', TodoController.showById)
route.put('/:id', TodoController.update)
route.delete('/:id', TodoController.delete)

module.exports = route