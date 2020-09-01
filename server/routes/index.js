const route = require('express').Router()
const todoRoute = require('./todo')
const authRoute = require('./auth')

route.get('/', (req, res) => {
    res.send('tai')
})

route.use('/todos', todoRoute)
route.use('/auth', authRoute)

module.exports = route