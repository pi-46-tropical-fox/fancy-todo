require('dotenv').config()
const router = require('express').Router()
const TodoController = require('../controllers/controller')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


// router.get('/', (req,res)=>{
//     return res.status(200).json({msg: "hellooo"})
// })

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-sign', UserController.googleSign)

router.get('/todos', authentication, TodoController.findAll) //dikasih authentification biar tau kalo user itu sendiri yg akses
router.post('/todos', authentication, TodoController.addTodo)
router.get('/todos/:id', authentication, authorization, TodoController.findById)
router.put('/todos/:id', authentication, authorization, TodoController.updateTodo)
router.delete('/todos/:id', authentication, authorization, TodoController.deleteTodo)

module.exports = router