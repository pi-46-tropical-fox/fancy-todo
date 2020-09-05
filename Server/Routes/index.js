const routes = require('express').Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')
const projectRoutes = require('./project')
const apiRoutes = require('./api')


routes.get('/', (req, res) => {
    res.send('Hello World')
})


routes.use('/', userRoutes)
routes.use('/', todoRoutes)
routes.use('/', projectRoutes)
routes.use('/api', apiRoutes)

module.exports = routes