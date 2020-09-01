require('dotenv').config()
const router = require('express').Router()
const TodoController = require('../controllers')
const UserController = require('../controllers/UserController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/todos', authentication, TodoController.findAll)
router.post('/todos', authentication, TodoController.addTodo)
router.get('/todos/:id', authentication, authorization, TodoController.findById)
router.put('/todos/:id', authentication, authorization, TodoController.updateTodo)
router.delete('/todos/:id', authentication, authorization, TodoController.deleteTodo)

module.exports = router 