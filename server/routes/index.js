const route = require('express').Router()
const todoRoute = require('./todoRoute.js')
const userRoute = require('./userRoute.js')
const myTodoRoute = require('./myTodoRoute')


route.get('/', (req, res) => {
    res.send('home')
})


route.use('/todos', todoRoute)
route.use('/mytodos', myTodoRoute)
route.use('/user', userRoute)

module.exports = route