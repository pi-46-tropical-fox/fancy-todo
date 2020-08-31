const router = require('express').Router()
const todoRoute = require('./todosRoute')
const userRoute = require('./userRoute')

router.use('/todos', todoRoute)
router.use('/', userRoute)


module.exports = router