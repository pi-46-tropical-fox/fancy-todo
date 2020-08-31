const router = require('express').Router()
const Controller = require('../controller/Controller')

router.post('/todos', Controller.addTodo)
router.get('/todos', Controller.showAllTodo)
router.get('/todos/:id', Controller.showTodo)
router.put('/todos/:id', Controller.updatee)
router.delete('/todos/:id')

module.exports = router