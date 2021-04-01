const TodoController = require("../controllers/todoController");
const UserController = require("../controllers/userController");
const {authentication, todoAuthorization} = require("../middlewares/auth");
const GoogleLogin = require("../controllers/googleLoginController");

const router = require("express").Router()

//CRUD
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/google-login", GoogleLogin.verifyLogin)
router.post("/google-calendar", GoogleLogin.calendar)





module.exports = router;