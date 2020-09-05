require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes');
const { errHandler } = require('./middlewares/errHandler')
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})