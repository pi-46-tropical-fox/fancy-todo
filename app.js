const express = require('express')
const app = express()
const port = 3000
const routes = require('./Routes')
require('dotenv').config()

//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())

console.log(process.env)

app.use(routes)


app.listen(port, ()=> {
    console.log(`Example app listeing at http://localhost:${port}`)
})