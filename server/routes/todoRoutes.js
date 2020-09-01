const TodoController = require("../controllers/TodoController");
const router = require("express").Router();
const { authentication, authorization } = require("../middlewares/auth.js");

router.post("/", authentication, TodoController.addNewTodo);

router.get("/", authentication, TodoController.showAllTodos);

router.get("/:id", authentication, authorization, TodoController.showTodoById);

router.put("/:id", authentication, authorization, TodoController.updateTodo);

router.delete("/:id", authentication, authorization, TodoController.deleteTodo);


module.exports = router;