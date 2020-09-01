const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/todos', TodoController.show)
router.post('/todos', TodoController.createTodo)
router.get('/todos/:id', TodoController.getIdTodo)
router.put('/todos/:id', TodoController.updateTodo)
router.delete('/todos/:id', TodoController.deleteTodo)

module.exports = router;