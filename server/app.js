const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const router = require('./routes/index')
const errorHandler = require('./middleware/errHandler')
require('dotenv').config()


// app.options('*', cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors())

app.use(router)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})