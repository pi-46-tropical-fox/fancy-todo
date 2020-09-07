const routes = require('express').Router();
const TodoRoutes = require('./TodoRoutes');
const HolidayRoutes = require('./HolidayRoutes');
const UserRoutes = require('./UserRoutes');
const { authentication } = require('../middlewares/auth');

routes.use(UserRoutes);

routes.use(authentication, TodoRoutes);

routes.use(authentication, HolidayRoutes);

module.exports = routes;
