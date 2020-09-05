const router = require('express').Router()
const todoRoute = require('./todosRoute')
const userRoute = require('./userRoute')
const quotesRoute = require('./quotesRoute')

router.use('/todos', todoRoute)
router.use('/', userRoute)
router.use('/', quotesRoute)


module.exports = router