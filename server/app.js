// if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
// }
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const router = require('./routes');
//#################################
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.send("halo")
})
app.use(routes);
//ensure that error handler hat to be put last
app.use(errorHandler);
//#################################
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`)
})