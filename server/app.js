"use strict"

const express = require('express')
const port = 3001;
const app = express()
const routes = require('./routes')
const errHandler = require('./midleware/errorHandler')

//app.set('')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/', routes)
app.use(errHandler)
app.listen(port, ()=>{
    console.log(`Sakit hati yang ke-${port}`);
})