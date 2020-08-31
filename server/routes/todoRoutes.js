const TodoController = require("../controllers/TodoController");
const router = require("express").Router();

router.post("/", TodoController.addNewTodo);

router.get("/", TodoController.showAllTodos);

router.get("/:id", TodoController.showTodoById);

router.put("/:id", TodoController.updateTodo);

router.delete("/:id", TodoController.deleteTodo);


module.exports = router;