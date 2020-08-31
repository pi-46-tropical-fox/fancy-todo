const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/index')

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Main Route
app.use(route)

// Port
app.listen(port, () => {
    console.log(`Listening at ${port}`);
})