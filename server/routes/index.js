const router = require('express').Router()
const Controller = require('../controllers/todoController')
// const todoRouter = require('./todo')

router.get('/todos', Controller.show)
router.post('/todos/add', Controller.add)
router.get('/todos/edit/:id', Controller.find)
router.put('/todos/edit/:id', Controller.edit)
router.delete('/todos/delete/:id', Controller.delete)

// router.use('/todos',todoRouter)


module.exports = router