const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const errHandler = require('./middleware/errHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
app.use(errHandler)


app.listen(port, () => {
    console.log(`App listening at port : ${port}`);
})

module.exports = app