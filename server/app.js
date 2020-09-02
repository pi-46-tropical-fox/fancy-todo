require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const router = require('./router');
const errHandler = require('./middlewares/errHandler.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(router);

app.use(errHandler)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}); 