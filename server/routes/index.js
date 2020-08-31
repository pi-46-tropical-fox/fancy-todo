const fs = require('fs')
const index = require('express').Router()
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
.use('/auth', endpoints.auth)
.use('/todos', endpoints.todo)
.get('/', (req, res) => {
    res.status(200).send('Welcome to Todolicious!')
})

module.exports = index