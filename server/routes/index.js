const route = require('express').Router()
const todoRoute = require('./todo')

route.get('/', (req, res) => {
    res.send('tai')
})

route.use('/todos', todoRoute)

module.exports = route