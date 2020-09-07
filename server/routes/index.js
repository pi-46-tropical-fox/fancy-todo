const router = require('express').Router()
const UserRoute = require('./UserRoute')
const TodoRoute = require('./TodoRoute')
const authorization = require('../middleware/authorization')
const authentication = require('../middleware/authentication')

// router.get('/', (req, res, next) => {
//     res.json({message:'Welcome to My Apps'})
// })

router.use('/', UserRoute)
router.use('/todos', authentication, authorization, TodoRoute)

module.exports = router