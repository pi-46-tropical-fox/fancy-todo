const express = require('express')
const app = express()
const port = 3000
const routes = require('./Routes')
require('dotenv').config()
const errHandler = require('./Middlewares/errHandler')
const errorHandler = require('./Middlewares/errHandler')

//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Using Router
app.use(routes)

//Error Handler Middleware
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`Example app listeing at http://localhost:${port}`)
})