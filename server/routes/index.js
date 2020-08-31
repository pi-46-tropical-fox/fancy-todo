const router = require ("express").Router ()
const TodoRoute = require ("./TodoRoute.js")
const UserRoute = require ("./UserRoute.js")

router.use ("/todos", TodoRoute)
router.use ("/users", UserRoute)


module.exports = router