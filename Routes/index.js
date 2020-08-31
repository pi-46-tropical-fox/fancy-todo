const routes = require('express').Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')


routes.get('/', (req, res) => {
    res.send('Hello World')
})


routes.use('/', userRoutes)
routes.use('/', todoRoutes)

module.exports = routes