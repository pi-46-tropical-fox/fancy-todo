const routes = require('express').Router()
const Controller = require('../controllers/FancyTodoController')
const UserController = require('../controllers/UserController')

//REGISTER
routes.post('/register', UserController.register)

//LOGIN
routes.post('/login', UserController.login)


routes.get('/todos', Controller.show)
routes.post('/todos', Controller.add)
routes.get('/todos/:id', Controller.find)
routes.put('/todos/:id', Controller.edit)
routes.delete('/todos/:id', Controller.delete)

module.exports = routes