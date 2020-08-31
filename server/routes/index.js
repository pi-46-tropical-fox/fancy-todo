const router = require('express').Router()
const TodoController = require('../controllers/controller')

router.get('/', (req,res)=>{
    return res.status(200).json({msg: "hellooo"})
})
router.get('/todos', TodoController.findAll)
router.post('/todos', TodoController.addTodo)
router.get('/todos/:id', TodoController.findById)
router.put('/todos/:id', TodoController.updateTodo)
// router.delete('/:id', TodoController.deleteTodo)

module.exports = router