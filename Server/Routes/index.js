const routes = require('express').Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')
const projectRoutes = require('./project')


routes.get('/', (req, res) => {
    res.send('Hello World')
})


routes.use('/', userRoutes)
routes.use('/', todoRoutes)
routes.use('/', projectRoutes)

module.exports = routes