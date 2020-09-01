const routes = require('express').Router();
const TodoRoutes = require('./TodoRoutes');
const UserRoutes = require('./UserRoutes');
const { authentication } = require('../middlewares/auth');

routes.use(UserRoutes);

routes.use(authentication, TodoRoutes);

module.exports = routes;
