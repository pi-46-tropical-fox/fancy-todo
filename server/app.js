require('dotenv').config();
const express = require('express');
const mainRouter = require('./routes');

const PORT = process.env.PORT || 5000;
const app = express();

if (!process.env.JWT_SECRET) {
	console.error('JWT_SECRET not found in environment variable!');
	process.exit();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mainRouter);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
