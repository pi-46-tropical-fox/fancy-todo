const router = require ("express").Router ()
const { Router } = require("express")

const TodoRoute = require ("./TodoRoute.js")
const UserRoute = require ("./UserRoute.js")
const CalendarRoute = require ("./CalendarRoute.js")

router.get ("/", (req, res, next) => {
    res.json ({message : "Welcome to fancy-todo"})
})


router.use ("/todos", TodoRoute)
router.use ("/users", UserRoute)

router.use ("/calendars",CalendarRoute)


module.exports = router