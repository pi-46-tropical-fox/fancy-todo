require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsWhitelist = ['http://127.0.0.1:8080'];
const corsOptions = {
	origin: function (origin, callback) {
		if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};
app.use(cors(corsOptions));

app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
