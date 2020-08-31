const router = require('express').Router();
const Controller = require('../controller/Controller');
const UserController = require('../controller/UserController');
//#################################
router.get('/todos', Controller.showAllTodo);
router.post('/todos', Controller.addTodo);
router.get('/todos/:id', Controller.showTodo);
router.put('/todos/:id', Controller.update);
router.delete('/todos/:id', Controller.delete)
router.post('/register', UserController.register);
router.post('/login', UserController.login)

module.exports = router