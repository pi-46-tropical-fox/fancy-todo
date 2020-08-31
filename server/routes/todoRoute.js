const todoRoute = require('express').Router();
const Controller = require('../controllers/todoController');

todoRoute.post("/", Controller.create)
todoRoute.get("/", Controller.showAll)
todoRoute.get("/:id", Controller.showId)
todoRoute.put("/:id", Controller.updateId)
todoRoute.delete("/:id", Controller.delete)

module.exports = todoRoute
