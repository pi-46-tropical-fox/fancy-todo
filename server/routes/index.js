const router = require('express').Router();
const TodoController = require('../controllers/TodoController');
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/todos', TodoController.getTodos);
router.post('/todos', TodoController.createTodo);

router.get('/todos/:id', TodoController.getTodoById);
router.put('/todos/:id', TodoController.updateTodo);

router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;