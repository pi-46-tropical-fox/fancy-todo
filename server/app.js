require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
//#################################
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
//ensure that error handler hat to be put last
app.use(errorHandler);
//#################################
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})