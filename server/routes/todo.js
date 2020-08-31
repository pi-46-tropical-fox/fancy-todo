"use strict"

const routes = require('express').Router();
const Controller = require('../controller/TodoController')


routes.get('/', Controller.read)
routes.get('/:id', Controller.findById)

routes.post('/', Controller.add)
//routes.put('/',)

routes.delete('/delete/:id', Controller.delete)


module.exports = routes