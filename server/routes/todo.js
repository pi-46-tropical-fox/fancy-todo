"use strict"

const routes = require('express').Router();
const Controller = require('../controller/TodoController')
const {authentication, authorization} = require('../midleware/auth')


routes.get('/', Controller.read)
routes.get('/:id', Controller.findById)

routes.post('/', authorization,Controller.add)
routes.put('/:id' , authorization ,Controller.update)

routes.delete('/:id', authorization ,Controller.delete)


module.exports = routes