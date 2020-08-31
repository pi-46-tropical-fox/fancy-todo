"use strict"

const express = require('express')
const port = 3001;
const app = express()
const routes = require('./routes')

//app.set('')
app.use(express.urlencoded({extended:true}))
//app.use(routes)

app.listen(port, ()=>{
    console.log(`Sakit hati yang ke-${port}`);
})