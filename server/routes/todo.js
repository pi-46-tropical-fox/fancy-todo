"use strict"

const routes = require('express').Router();
const Controller = require('../controller/TodoController')
const {authentication, authorization} = require('../midleware/auth')


routes.get('/', Controller.read)
routes.get('/:id', Controller.findById)

routes.post('/', authentication,authorization,Controller.add)
routes.put('/:id', Controller.update)

routes.delete('/:id',authentication,authorization ,Controller.delete)


module.exports = routes