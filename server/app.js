const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errHandler')


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})