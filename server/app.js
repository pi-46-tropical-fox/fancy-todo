const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errHandler')
const cors = require('cors')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})