const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const UserController = require('../controllers/UserController');
const {authentication, authorization} = require('../middlewares/auth')


router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authentication);
router.use(authorization);

router.get('/todos', TodoController.getTodos);
router.post('/todos', TodoController.createTodo);

router.get('/todos/:id', TodoController.getTodoById);
router.put('/todos/:id', TodoController.updateTodo);

router.delete('/todos/:id', TodoController.deleteTodo);

//get list zomato

module.exports = router;