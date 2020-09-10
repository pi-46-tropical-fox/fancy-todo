const fs = require('fs')
const settings = require('../config/settings')
const index = require('express').Router()
const { authenticate } = require('../middleware/authHandler')
const endpoints = {}

// ./routes/endpoints
fs
.readdirSync(`${__dirname}/endpoints`).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index') && (file.slice(-3) === '.js')
})
.forEach(file => {
    let name = file.split('.')[0]
    endpoints[name] = require(`./endpoints/${name}`)
})

index
.use('/u', endpoints.auth)
.use('/todos', authenticate, endpoints.todo)
.use('/api', authenticate, endpoints.api)
.get('/', (req, res) => {
    res.status(200).send(`Welcome to ${settings.app.title}`)
})

module.exports = index