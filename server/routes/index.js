const router = require('express').Router()
const TodoController = require('../controllers')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/todos', TodoController.findAll)
router.post('/todos', TodoController.addTodo)
router.get('/todos/:id', TodoController.findById)
router.put('/todos/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router 