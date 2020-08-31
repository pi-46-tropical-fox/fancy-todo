const route = require('express').Router()
const todoRoute = require('./todoRoute')

route.get('/', (req, res) => {
    res.send('Home')
})
route.use('/todos', todoRoute)

module.exports = route