const express = require('express')
const app = express()
const port = 3000
const routes = require('./Routes')
require('dotenv').config()
const errorHandler = require('./Middlewares/errHandler')
const cors = require('cors')

//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//CORS
app.use(cors())

//Using Router
app.use(routes)

//Error Handler Middleware
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`Example app listeing at http://localhost:${port}`)
})