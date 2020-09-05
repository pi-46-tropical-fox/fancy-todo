const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
app.use(errHandler)

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
   
  // app.listen(port, function () {
  //   console.log(`CORS-enabled web server listening on port ${port}`)
  // })

app.listen(port,()=>{
    console.log(`listen in ${port} FM`)
})