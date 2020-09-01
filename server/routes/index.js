const TodoController = require('../controller/todo')
const UserController = require('../controller/userController')
const weatherController = require('../controller/weatherController')
const tokenAuth = require('../middleware/tokenAuth')
const route = require('express').Router()


route.get('/',(req,res)=>{
    res.send('hello')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)

// route.use(tokenAuth)

route.get('/todo', tokenAuth, TodoController.getTodoList)
route.post('/todo', tokenAuth, TodoController.createTodo)

route.get('/todo/:id', tokenAuth, TodoController.getTodoById)
route.put('/todo/:id', tokenAuth, TodoController.updateTodo)

route.delete('/todo/:id', tokenAuth, TodoController.deleteTodo)

route.get('/weather', weatherController.getWeather)



module.exports = route