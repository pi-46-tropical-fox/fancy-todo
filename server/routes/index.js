const route = require('express').Router();
const todoRoute = require('./todoRoute');

route.get("/", (req,res) => {
    res.send("HOME")
})

route.use("/todos", todoRoute)

module.exports = route
