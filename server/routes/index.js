const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const UserController = require('../controllers/UserController');
const {authentication, authorization} = require('../middlewares/auth')


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin)

router.get('/todos', authentication, TodoController.getTodos);
router.post('/todos', authentication, TodoController.createTodo);

router.get('/todos/:id', authentication, authorization, TodoController.getTodoById);
router.put('/todos/:id', authentication, authorization, TodoController.updateTodo);

router.delete('/todos/:id', authentication, authorization, TodoController.deleteTodo);

//get list zomato

module.exports = router;