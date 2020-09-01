const route = require('express').Router()
const todoRoute = require('./todo')
const authRoute = require('./auth')
const movieController = require('../controllers/MovieController')

route.get('/', (req, res) => {
    res.send('tai')
})

route.get('/movies', movieController.getTrending)
route.use('/todos', todoRoute)
route.use('/auth', authRoute)

module.exports = route