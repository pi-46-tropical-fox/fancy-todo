const route = require('express').Router()
const TaskController = require('../controller/taskcontroller')
const UserController = require('../controller/usercontroller')

route.get('/', (req, res) => {
    res.send('hohohome')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googlelogin', UserController.googleLogin)

const {authentication, authorization} = require('../middlewares/auth')

route.use(authentication)
route.get('/todos', TaskController.activeTasks)
route.post('/todos', TaskController.newTask)

route.use('/todos/:id', authorization)
route.get('/todos/:id', TaskController.viewTask)
route.put('/todos/:id', TaskController.toggleTask)
route.patch('/todos/:id', TaskController.editTask)
route.delete('/todos/:id', TaskController.deleteTask)

module.exports = route