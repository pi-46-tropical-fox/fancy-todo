const route = require('express').Router()
const todoRoute = require('./todoRoute')
const userRoute = require('./userRoute')
const { authentication, authorization } = require('../middlewares/auth')
const RestoController = require('../controllers/RestoController')

route.get('/', (req, res) => {
    res.send('Home')
})

route.use('/user', userRoute)
route.use('/todos',authentication, todoRoute)

route.get('/resto-recomendation', RestoController.recomendation)

module.exports = route