if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
}

const express = require(`express`)
const cors = require(`cors`)

const routes = require(`./routes`)
const {errHandler} = require(`./middlewares`)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())

app.use(routes)
app.use(errHandler)

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))