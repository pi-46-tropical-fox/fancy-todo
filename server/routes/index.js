const routes = require('express').Router();
const TodoRoutes = require('./TodoRoutes');

routes.use(TodoRoutes);

module.exports = routes;
