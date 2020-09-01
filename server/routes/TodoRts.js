const routes = require(`express`).Router()
const {TodoCtr} = require(`../controllers`) 
const {authentication, authorization} = require(`../helpers`)

// Create new todo
routes.post(`/`, authentication, TodoCtr.create)

// Get all todo
routes.get(`/`, authentication, TodoCtr.getAll)

// Update todo
routes.put(`/:id`, authentication, authorization,  TodoCtr.update)

// Delete todo
routes.delete(`/:id`, authentication, authorization, TodoCtr.delete)

module.exports = routes