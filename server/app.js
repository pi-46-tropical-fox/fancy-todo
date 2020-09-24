"use strict"
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT|| 3001;
const app = express()
const routes = require('./routes')
const errHandler = require('./midleware/errorHandler')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/', routes)
app.use(errHandler)

app.listen(port, ()=>{
    console.log(`Listen on PORT ${port}`);
})