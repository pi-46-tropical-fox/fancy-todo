const router = require("express").Router();
const TodoController = require("../controllers/TodoController");
const UserController = require("../controllers/UserController");
const { authentication, authorization_1, authorization_2 } = require("../middlewares/auth");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);
router.post("/todos", TodoController.createTodo);
router.get("/todos", TodoController.readTodos);
router.get("/todos/:id", authorization_1, TodoController.readTodosByUserId);
router.put("/todos/:id", authorization_2, TodoController.updateTodoByTodoId);
router.delete("/todos/:id", authorization_2, TodoController.deleteTodoByTodoId);

module.exports = router;