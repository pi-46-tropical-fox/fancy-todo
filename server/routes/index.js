require('dotenv').config()
const router = require('express').Router()
const TodoController = require('../controllers/controller')
const UserController = require('../controllers/userController')


// router.get('/', (req,res)=>{
//     return res.status(200).json({msg: "hellooo"})
// })

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/todos', TodoController.findAll)
router.post('/todos', TodoController.addTodo)
router.get('/todos/:id', TodoController.findById)
router.put('/todos/:id', TodoController.updateTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router