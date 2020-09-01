"use strict"

const routes = require('express').Router();
const Controller = require('../controller/TodoController')
const {authentication, authoritzation} = require('../midleware/auth')


routes.get('/', Controller.read)
routes.get('/:id', Controller.findById)

routes.post('/', authentication, Controller.add)
//routes.put('/',)

routes.delete('/:id', Controller.delete)


module.exports = routes