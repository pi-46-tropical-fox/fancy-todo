const router = require ("express").Router ()
const TodoRoute = require ("./TodoRoute.js")

router.use ("/todos", TodoRoute)

module.exports = router