const express = require('express')
const app = express()
const port = 3000
const routes = require('./Routes')

//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.use(routes)


app.listen(port, ()=> {
    console.log(`Example app listeing at http://localhost:${port}`)
})