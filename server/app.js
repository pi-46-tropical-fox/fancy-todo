require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require ("./routes/index.js")
const errorHandler = require ("./middlewares/errorHandler.js")

const app = express()
const port = 3000

app.use (express.urlencoded ({ extended : true}))
app.use (express.json ())
app.use (cors ())

app.use ("/", router)



app.use (errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})