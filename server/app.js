require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended : true }));
app.use(cors())
app.use(routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening on port`, port)
})

module.exports = app;