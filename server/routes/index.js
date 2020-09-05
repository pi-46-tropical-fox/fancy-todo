const router = require('express').Router()
const UserRoute = require('./UserRoute')
const TodoRoute = require('./TodoRoute')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentication')

// router.get('/', (req, res) => {
//     res.redirect('/login')
// })

router.use('/', UserRoute)
router.use('/todos', authorization, TodoRoute)

module.exports = router