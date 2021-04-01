const router = require("express").Router()
const todos = require("./todos")
const users = require("./users")
const {authentication, todoAuthorization} = require("../middlewares/auth")
// router.get("/", function(req,res){
//   res.send("Ini Home")
// })      //Home
router.use("/users", users) //users

router.use(authentication)

router.use("/todos", todos) //todos



module.exports = router;

