require('dotenv').config()
const express = require("express");
const todoRoutes = require("./routes/todoRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const thirdPartyRoutes = require("./routes/thirdPartyRoutes.js");
const errHandler = require('./middlewares/errHandler.js');
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors());

// todos route
app.use("/todos", todoRoutes);

// user route
app.use("/user", userRoutes);

// third party route
app.use("/thirdparty", thirdPartyRoutes);

// error handler
app.use(errHandler);

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});