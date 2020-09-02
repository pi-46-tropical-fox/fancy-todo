const router = require('express').Router()
const UserRoute = require('./UserRoute')
const TodoRoute = require('./TodoRoute')
const {authorization, authentication} = require('../middleware')

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.use('/login', UserRoute)
router.use('/todos', authentication, authorization, TodoRoute)

module.exports = router 