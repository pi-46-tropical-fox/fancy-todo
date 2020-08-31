'use strict'

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to Todo Apps!')
})

app.use('/', router)

app.listen(port, () => {
  console.log('Listening on port:' , port);
})