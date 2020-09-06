require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const route = require('./routes/index')
const errHandler = require('./middlewares/errHandler')

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

// Main Route)
app.use(route)
app.use(errHandler)

// Port
app.listen(port, () => {
    console.log(`Listening at ${port}`);
})