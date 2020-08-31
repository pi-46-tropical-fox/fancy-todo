const TodoController = require("../controllers/todoController")

const router = require("express").Router()

//CRUD
router.get("/", TodoController.getAllTodos)     //read, showing all todo app

router.get("/:id", TodoController.getTodoById)  //read, showing todo app by ID

router.post("/", TodoController.addDataTodos)    //create, add data to todo database

router.put("/:id", TodoController.editDataTodo)  //update, edit a todo data 

router.delete("/:id", TodoController.deleteDataTodo) //delete 

module.exports = router;