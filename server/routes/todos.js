const TodoController = require("../controllers/todoController")
const {authentication, todoAuthorization} = require("../middlewares/auth")
const router = require("express").Router()

//CRUD
router.get("/", TodoController.getAllTodos)     //read, showing all todo app

router.get("/:id", todoAuthorization, TodoController.getTodoById)  //read, showing todo app by ID

router.post("/", TodoController.addDataTodos)    //create, add data to todo database

router.put("/:id", todoAuthorization,  TodoController.editDataTodo)  //update, edit a todo data 

router.delete("/:id", todoAuthorization, TodoController.deleteDataTodo) //delete 

module.exports = router;