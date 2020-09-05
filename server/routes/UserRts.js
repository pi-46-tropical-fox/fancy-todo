const routes = require(`express`).Router()
const {UserCtr} = require(`../controllers`)

// Register
routes.post(`/register`, UserCtr.register)

// Login
routes.post(`/login`, UserCtr.login)
// Google Login
routes.post(`/google/login`, UserCtr.logingoogle)

module.exports = routes