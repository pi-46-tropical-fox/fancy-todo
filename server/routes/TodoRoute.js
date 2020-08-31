const router = require ("express").Router ()
const TodoController = require ("../controllers/TodoController.js")

router.post ("/", TodoController.postTodos)
router.get ("/", TodoController.getTodos)

router.get ("/:id", TodoController.getTodosbyId)
router.put ("/:id", TodoController.updateTodos)
router.delete ("/:id", TodoController.deleteTodos)






module.exports = router