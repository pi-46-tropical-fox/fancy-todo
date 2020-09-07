const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = 3000
const route = require('./routes');
const errHandler = require('./middleware/errHandler');

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors())
app.use(route)

app.use(errHandler)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})