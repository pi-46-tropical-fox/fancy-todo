const weatherRoute = require("express").Router();
const Controller = require("../controllers/weatherController");
// const { authentication, authorization } = require("../middleware/auth");

// weatherRoute.use(authentication);

// weatherRoute.post("/", Controller.create);
weatherRoute.get("/", Controller.showAll);
// weatherRoute.get("/:id", authorization, Controller.showId);
// weatherRoute.put("/:id", authorization, Controller.updateId);
// weatherRoute.delete("/:id", authorization, Controller.delete);

module.exports = weatherRoute;
