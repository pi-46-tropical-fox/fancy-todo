const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')

route.get('/', (req, res) => {
    res.send('Home')
})
route.use('/todos', todoRoute)
route.use('/user', userRoute)

module.exports = route