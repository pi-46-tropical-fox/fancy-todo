const TodoController = require('../controllers/TodoController')
const {authorization} = require('../middleware/auth')

const router = require('express').Router()

router.get('/', TodoController.showBook)
router.post('/', TodoController.createTodo)

router.get('/:id', authorization, TodoController.findTodoById)
router.put('/:id', authorization, TodoController.updateTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router