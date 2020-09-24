  require('dotenv').config()


const express = require('express')
const app = express()
const port = process.env.port || 3000
const routes = require('./routes')
const errorHandler = require('./middleware/error')
const cors = require('cors')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandler)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})