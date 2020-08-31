require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

