const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.get('/:id', TodoController.find)
router.put('/:id', TodoController.putTodo)
router.delete('/:id', TodoController.deleteTodo)


module.exports = router