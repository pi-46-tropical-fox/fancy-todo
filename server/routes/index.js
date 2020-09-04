const TodoController = require('../controller/todo')
const UserController = require('../controller/userController')
const weatherController = require('../controller/weatherController')
const tokenAuth = require('../middleware/tokenAuth')
const Authorization = require('../middleware/authorization')
const cors = require('cors')
const route = require('express').Router()


route.get('/',(req,res)=>{
    res.send('hello')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googlelogin',UserController.googleLogin)

// route.use(tokenAuth)

route.get('/todo', tokenAuth, TodoController.getTodoList)
route.post('/todo', tokenAuth, TodoController.createTodo)

route.get('/todo/:id', tokenAuth, Authorization, TodoController.getTodoById)
route.put('/todo/:id', cors(), tokenAuth, Authorization, TodoController.updateTodo)

route.delete('/todo/:id', cors(), tokenAuth, Authorization, TodoController.deleteTodo)

route.get('/weather', weatherController.getWeather)



module.exports = route