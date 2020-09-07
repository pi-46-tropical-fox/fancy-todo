const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
