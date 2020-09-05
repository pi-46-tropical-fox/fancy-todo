require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')

// console.log(process.env.SECRET)

app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//errorhandler harus di use paling terakhir
app.use('/', router)
app.use(errHandler)

app.listen(port, () => console.log(`RUNNING ON http://localhost:${port}`))