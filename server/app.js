require('dotenv').config()
const express = require("express");
const todoRoutes = require("./routes/todoRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const app = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// todos route
app.use("/todos", todoRoutes);

// user route
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});