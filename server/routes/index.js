const route = require('express').Router();
const todoRoute = require('./todoRoute');
const weatherRoute = require('./weatherRoute');
const userController = require('../controllers/userController');


route.get("/", (req,res) => {
    res.send("HOME")
})

route.post("/register", userController.register)
route.post("/login", userController.login)
route.post("/googleLogin",userController.googleLogin)

route.use("/todos", todoRoute)
route.use("/weathers", weatherRoute)


module.exports = route
