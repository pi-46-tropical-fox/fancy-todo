const todoRoute = require("express").Router();
const Controller = require("../controllers/todoController");
const { authentication, authorization } = require("../middleware/auth");

todoRoute.use(authentication);

todoRoute.post("/", Controller.create);
todoRoute.get("/", Controller.showAll);
todoRoute.get("/:id", authorization, Controller.showId);
todoRoute.put("/:id", authorization, Controller.updateId);
todoRoute.delete("/:id", authorization, Controller.delete);

module.exports = todoRoute;
