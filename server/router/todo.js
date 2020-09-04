const router = require('express').Router()
const TodoController = require('../controllers/TodoController.js')
const TodoRandomController = require('../controllers/TodoRandomController.js')
const {authorization} = require('../middlewares/auth.js')

router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)
router.get('/myTodos', TodoController.getMyTodos)
router.get('/random', TodoRandomController.randomActivity)

router.get('/:id', TodoController.getTodo)
router.put('/:id', authorization, TodoController.updateTodo)

router.delete('/:id', authorization, TodoController.deleteTodo)


module.exports = router