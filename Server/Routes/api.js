const apiRoutes = require('express').Router()
const ApiController = require('../Controller/ApiController')
const { authentication} = require('../Middlewares/auth')

//Get News
apiRoutes.get('/news', authentication, ApiController.getNews)

module.exports = apiRoutes