const UserController = require('../controllers/UserController');

const routes = require('express').Router();

routes.post('/register', UserController.register);

routes.post('/login', UserController.login);

module.exports = routes;
