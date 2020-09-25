const router = require('express').Router()
const TodoController = require('../controllers/todoController')
const UserController = require('../controllers/userController')
const MovieController = require('../controllers/movieController')
const {authentication, authorization } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlelogin', UserController.googleLogin)

router.use(authentication)
router.get('/todos', TodoController.show)
router.post('/todos', TodoController.createTodo)
router.get('/todos/:id', authorization, TodoController.getIdTodo)
router.put('/todos/:id', authorization, TodoController.updateTodo)
router.delete('/todos/:id', authorization, TodoController.deleteTodo)

//3rd Party API
router.get('/movies', MovieController.showMovie)

module.exports = router;