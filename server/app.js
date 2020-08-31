const express = require('express')
const router = require ("./routes/index.js")

const app = express()
const port = 3000

app.use (express.urlencoded ({ extended : true}))
app.use (express.json ())

app.use ("/", router)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})