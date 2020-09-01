const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')

router.use (authentication)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.get('/:id', TodoController.find)
router.put('/:id', authorization, TodoController.putTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)


module.exports = router