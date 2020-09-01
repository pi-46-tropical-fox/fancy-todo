const route = require('express').Router()
const todoRoute = require('./todoRoute.js')
const userRoute = require('./userRoute.js')
const myTodoRoute = require('./myTodoRoute')
const weatherController = require('../controllers/weatherController')


// route.get('/', (req, res) => {
//     res.send('home')
// })
route.use('/', weatherController.current)


route.use('/todos', todoRoute)
route.use('/mytodos', myTodoRoute)
route.use('/user', userRoute)

module.exports = route