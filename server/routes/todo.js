'use strict'

const router = require('express').Router()
const TodoController = require('../controllers/todo')
const { authentication } = require('../middlewares/authentication')
const { authorizationTodo } = require('../middlewares/authorizeTodo')


router.use(authentication) 
router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)

router.get('/:id', authorizationTodo, TodoController.getOne)
router.put('/:id', authorizationTodo, TodoController.editTodo)
router.delete('/:id', authorizationTodo, TodoController.removeTodo)


module.exports = router