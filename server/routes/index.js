const router = require("express").Router();
const Controller = require("../controllers/TodoController");

router.post("/todos", Controller.createTodo);
router.get("/todos", Controller.getTodos);
router.get("/todos/:id", Controller.getTodoById);
router.put("/todos/:id", Controller.updateTodoById);
router.delete("/todos/:id", Controller.deleteTodoById);

module.exports = router;