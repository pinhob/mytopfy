require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8888;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8888, () => console.log(`Server started on ${PORT}`));