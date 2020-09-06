const route = require('express').Router()
const TodoController = require('../controllers/TodoController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')
const GoogleLogin = require('../controllers/GoogleLoginController')
const WeatherController = require('../controllers/WeatherController')


// Register & Login
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/google-login', GoogleLogin.GoogleLogin)


// Create
route.post('/todos', authentication, TodoController.createTodo)
// Read
route.get('/todos', authentication, TodoController.showTodo)
// Update
route.get('/todos/:id', authentication, authorization, TodoController.showTodoById)
route.put('/todos/:id', authentication, authorization, TodoController.updateTodo)
// Delete
route.delete('/todos/:id', authentication, authorization, TodoController.deleteTodo)

route.get('/weather', WeatherController.getWeather)



module.exports = route