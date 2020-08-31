const routes = require(`express`).Router()
const {UserCtr} = require(`../controllers`)

// Register
routes.post(`/register`, UserCtr.register)

// Login
routes.post(`/login`, UserCtr.login)

module.exports = routes