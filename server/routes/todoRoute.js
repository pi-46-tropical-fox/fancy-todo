const TodoController = require('../controllers/TodoController')
const { authorization } = require('../middlewares/auth')
const route = require('express').Router()

route.get('/', TodoController.show)
route.post('/', TodoController.add)
route.get('/:id', authorization, TodoController.showById)
route.put('/:id', authorization, TodoController.update)
route.delete('/:id', authorization, TodoController.delete)

module.exports = route