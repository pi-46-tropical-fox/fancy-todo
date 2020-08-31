'use strict'

const router = require('express').Router()
const TodoController = require('../controllers/todo')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.getTodos)
router.get('/:id', TodoController.getOne)
router.put('/:id', TodoController.editTodo)
router.delete('/:id', TodoController.removeTodo)


module.exports = router