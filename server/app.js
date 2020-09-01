const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000
const route = require('./routes');

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(route)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})