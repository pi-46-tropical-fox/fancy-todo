const router = require("express").Router();
const TodoController = require("../controllers/TodoController");
const UserController = require("../controllers/UserController");
const { authentication, authorization } = require("../middlewares/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);
router.post("/todos", TodoController.createTodo);
router.get("/todos", TodoController.readTodos);
router.get("/todos/:id", authorization, TodoController.readTodoById);
router.put("/todos/:id", authorization, TodoController.updateTodoById);
router.delete("/todos/:id", authorization, TodoController.deleteTodoById);

module.exports = router;