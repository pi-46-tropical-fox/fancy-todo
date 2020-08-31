const route = require('express').Router()
const todoRoute = require('./todoRoute.js')
const userRoute = require('./userRoute.js')

route.get('/', (req, res) => {
    res.send('home')
})

route.use('/todos', todoRoute)
route.use('/register', userRoute)

module.exports = route