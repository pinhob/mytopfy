require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8888;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const STATE_KEY = 'spotify_auth_state';

const generateRandomString = (length) => {
  let randomString = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return randomString;
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', (_req, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  let scope = [
    'user-read-private',
    'user-read-email',
  ].join(' ')

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope,
    state,
  }).toString();

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.listen(8888, () => console.log(`Server started on ${PORT}`));