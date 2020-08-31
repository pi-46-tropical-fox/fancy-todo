const routes = require(`express`).Router()
const {TodoCtr} = require(`../controllers`) 

// Create new todo
routes.post(`/`, TodoCtr.create)

// Get all todo
routes.get(`/`, TodoCtr.getAll)

// Update todo
routes.put(`/:id`, TodoCtr.update)

// Delete todo
routes.delete(`/:id`, TodoCtr.delete)

module.exports = routes