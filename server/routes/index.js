const router = require('express').Router();
const UserController = require('../controllers/UserController');
const MovieController = require('../controllers/MovieController');
const { authentication, authorization } = require('../middlewares/auth');
const TodoController = require('../controllers/TodoController');

router.get('/', (req, res) => res.send('Hello!!'));

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googlelogin', UserController.googleLogin);

router.use(authentication);

router.get('/todos', TodoController.getAllTodos);
router.post('/todos', TodoController.createTodo);
router.get('/todos/:id', authorization, TodoController.getTodoById);
router.delete('/todos/:id', authorization, TodoController.deleteTodoById);
router.put('/todos/:id', authorization, TodoController.updateTodoById);

router.get('/movies', MovieController.searchMovieByKeyword);

module.exports = router;
