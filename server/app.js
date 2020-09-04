require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001
const router = require('./routes')
const errHandler = require('./middleware/errHandler')
const cors = require('cors')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.get('/', (req,res) => {
    res.send('<h1>HOME</h1>')
})
app.use(router)
app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})