const router = require("express").Router()
const todos = require("./todos")
const users = require("./users")
// router.get("/", function(req,res){
//   res.send("Ini Home")
// })      //Home

router.use("/todos", todos) //todos
router.use("/users", users) //users


module.exports = router;

