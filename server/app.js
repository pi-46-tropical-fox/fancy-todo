const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const errHandler = require('./middleware/errHandler')
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errHandler)

app.listen(port, () => {
    console.log(`App listening at port : ${port}`);
})

module.exports = app