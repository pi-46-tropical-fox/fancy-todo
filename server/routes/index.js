const routes = require(`express`).Router()
const UserRts = require(`./UserRts`)
const TodoRts = require(`./TodoRts`)

routes.use(`/users`, UserRts)
routes.use(`/todos`, TodoRts)

module.exports = routes