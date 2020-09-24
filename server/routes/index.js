const routes = require('express').Router()
const Controller = require('../controller/TodoController')
const UserController = require('../controller/UserController')
const weatherController = require('../controller/weatherController')
const {authentication , authorization} =require('../middleware/auth')

routes.post('/register',UserController.register)
routes.post('/login',UserController.login)
routes.post('/google',UserController.google)
routes.get('/weathers',weatherController.weather)

routes.use(authentication)

routes.get('/todos',Controller.show)
routes.post('/todos',Controller.add)

routes.get('/todos/:id',authorization,Controller.find)
routes.put('/todos/:id',authorization,Controller.edit)
routes.delete('/todos/:id',authorization,Controller.delete)


module.exports = routes