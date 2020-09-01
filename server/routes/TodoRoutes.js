const TodoController = require('../controllers/TodoController');
const { authorizationTodoByUserId } = require('../middlewares/auth');

const routes = require('express').Router();

routes.get('/todos', TodoController.list);

routes.post('/todos', TodoController.create);

routes.get('/todos/:id', authorizationTodoByUserId, TodoController.byId);
routes.put('/todos/:id', authorizationTodoByUserId, TodoController.update);
routes.delete('/todos/:id', authorizationTodoByUserId, TodoController.delete);

module.exports = routes;
