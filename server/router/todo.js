const router = require('express').Router()
const TodoController = require('../controllers/TodoController.js')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)

router.get('/:id', TodoController.getTodo)
router.post('/:id', TodoController.updateTodo)

router.delete('/:id', TodoController.deleteTodo)

module.exports = router