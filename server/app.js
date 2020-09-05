require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const route = require('./routes/index')

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

// Main Route
app.use(route)

// Port
app.listen(port, () => {
    console.log(`Listening at ${port}`);
})