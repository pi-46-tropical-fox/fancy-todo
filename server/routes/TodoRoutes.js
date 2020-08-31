const TodoController = require('../controllers/TodoController');

const routes = require('express').Router();

routes.get('/todos', TodoController.list);

routes.get('/todos/:id', TodoController.byId);

routes.post('/todos', TodoController.create);

routes.put('/todos/:id', TodoController.update);

routes.delete('/todos/:id', TodoController.delete);

module.exports = routes;
