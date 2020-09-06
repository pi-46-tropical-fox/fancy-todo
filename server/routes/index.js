const route = require('express').Router()
const todoRoute = require('./todo')
const authRoute = require('./auth')
const movieController = require('../controllers/MovieController')
const { authentication } = require('../middlewares/auth')

route.get('/', (req, res) => {
    res.send('oopsie')
})

route.get('/movies', authentication ,movieController.getTrending)
route.use('/todos', todoRoute)
route.use('/auth', authRoute)

module.exports = route