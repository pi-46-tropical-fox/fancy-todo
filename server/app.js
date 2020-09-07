require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errHandler = require('./middleware/errHandler')

// Trying the method chaining for the first time...

app
// first, use needed modules for processing requests
.use(express.urlencoded({ extended: false }))
.use(express.json())
.use(cors())
// ...and then import needed routes
.use(routes)
.use(errHandler)
// ...and lastly, listen to specified port
.listen(port, () => {
    // voila! The app is up and running.
    console.log(`The app is up and running. Tune into http://localhost:${port} to proceed.`);
})