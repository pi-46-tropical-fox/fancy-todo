const router = require('express').Router()
const TodoController = require('../controllers')
const authentication  = require('../middleware/authentication')
const authorization  = require('../middleware/authorization')


router.get('/', authentication, TodoController.findAll)
router.post('/', authentication, TodoController.addTodo)
router.get('/:id', authentication, authorization, TodoController.findById)
router.put('/:id', authentication, authorization, TodoController.updateTodo)
router.delete('/:id', authentication, authorization, TodoController.deleteTodo)

module.exports = router