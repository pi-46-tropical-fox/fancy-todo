const express = require('express')
const route = require('./routes')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', route)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})