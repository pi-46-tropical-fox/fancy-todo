const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',router)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})