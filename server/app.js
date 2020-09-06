"use strict";

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const routes = require("./routes");
const errHandler = require("./middlewares/errHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);
app.use(errHandler);

app.listen(port, () => {
	console.log(`Fancy Todo App listening at http://localhost:${port}`);
});