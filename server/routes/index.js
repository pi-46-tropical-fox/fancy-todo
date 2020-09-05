const route = require('express').Router()
const todoRoute = require('./todoRoute.js')
const userRoute = require('./userRoute.js')
const myTodoRoute = require('./myTodoRoute')
const weatherController = require('../controllers/weatherController')
const { authentication } = require('../middlewares/auth')


route.get('/', (req, res) => {
    res.send('home')
})
route.get('/weather', authentication, weatherController.current)


route.use('/todos', todoRoute)
route.use('/mytodos', myTodoRoute)
route.use('/user', userRoute)

module.exports = route