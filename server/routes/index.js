const routes = require(`express`).Router()
const UserRts = require(`./UserRts`)
const TodoRts = require(`./TodoRts`)
const MovieRts = require(`./MovieRts`)

routes.use(`/users`, UserRts)
routes.use(`/todos`, TodoRts)
routes.use(`/movies`, MovieRts)

module.exports = routes