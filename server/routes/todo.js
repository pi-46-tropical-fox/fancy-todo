const TodoController = require('../controllers/TodoController')

const router = require('express').Router()

router.get('/', TodoController.showBook)
router.post('/create', TodoController.createTodo)
router.get('/:id', TodoController.findTodoById)
router.put('/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router