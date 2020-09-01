const routes = require('express').Router()
const Controller = require('../controllers/FancyTodoController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')

//REGISTER
routes.post('/register', UserController.register)

//LOGIN
routes.post('/login', UserController.login)

//ENDPOINTS
routes.get('/todos', authentication, Controller.show)
routes.post('/todos', authentication, Controller.add)
routes.get('/todos/:id', authentication, authorization, Controller.find)
routes.put('/todos/:id', authentication, authorization, Controller.edit)
routes.delete('/todos/:id', authentication, authorization, Controller.delete)

module.exports = routes