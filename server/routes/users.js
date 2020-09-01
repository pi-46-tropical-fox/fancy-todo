const TodoController = require("../controllers/todoController");
const UserController = require("../controllers/userController");
const {authentication, todoAuthorization} = require("../middlewares/auth")

const router = require("express").Router()

//CRUD
router.post("/register", UserController.register)

router.post("/login", UserController.login)



module.exports = router;