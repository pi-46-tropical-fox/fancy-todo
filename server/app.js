"use strict"
require('dotenv').config()
const express = require('express')
const port = 3001;
const app = express()
const routes = require('./routes')
const errHandler = require('./midleware/errorHandler')

console.log(process.env.secret);
//app.set('')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/', routes)
app.use(errHandler)

app.listen(port, ()=>{
    console.log(`Sakit hati yang ke-${port}`);
})