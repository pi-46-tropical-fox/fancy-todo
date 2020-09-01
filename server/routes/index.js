const fs = require('fs')
const index = require('express').Router()
const { authenticate } = require('../helpers/AuthHelper')
const endpoints = {}

fs
.readdirSync(`${__dirname}/endpoints`).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index') && (file.slice(-3) === '.js')
})
.forEach(file => {
    let name = file.split('.')[0]
    endpoints[name] = require(`./endpoints/${name}`)
})

// console.log(endpoints);

index
.use('/u', endpoints.auth)
.use('/todos', authenticate, endpoints.todo)
.get('/', (req, res) => {
    res.status(200).send('Welcome to Todolicious!')
})

module.exports = index