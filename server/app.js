const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
require('dotenv').config()


// console.log(process.env.SECRET);
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("Hello world")
// })

app.use(router)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})