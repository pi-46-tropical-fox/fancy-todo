const router = require ("express").Router ()
const TodoController = require ("../controllers/TodoController.js")
const {authentication} = require ("../middlewares/authentication.js")
const {authorization} = require ("../middlewares/authorization.js")

router.post ("/", TodoController.postTodos)
router.get ("/", authentication,TodoController.getTodos)

router.get ("/:id", authentication, authorization, TodoController.getTodosbyId)
router.put ("/:id", authentication, authorization, TodoController.updateTodos)
router.delete ("/:id", authentication, authorization, TodoController.deleteTodos)


module.exports = router