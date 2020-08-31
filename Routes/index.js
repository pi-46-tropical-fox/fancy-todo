const routes = require('express').Router()
const userRoutes = require('./user')


routes.get('/', (req, res) => {
    res.send('Hello World')
})


routes.use('/', userRoutes)

module.exports = routes