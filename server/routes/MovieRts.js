const routes = require(`express`).Router()
const {MovieCtr} = require(`../controllers`)
const {authentication, authorization} = require(`../middlewares`)

routes.use(`/`, authentication, MovieCtr.list)

module.exports = routes