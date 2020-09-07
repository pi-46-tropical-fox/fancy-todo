const UserController = require('../controllers/UserController');

const routes = require('express').Router();

routes.post('/register', UserController.register);

routes.post('/login', UserController.login);

routes.post('/googleSign', UserController.googleLogin);

module.exports = routes;
