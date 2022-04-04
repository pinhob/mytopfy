require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8888;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

const STATE_KEY = 'spotify_auth_state';

const generateRandomString = (length) => {
  let randomString = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return randomString;
}

app.use(cookieParser());

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

app.get('/callback', async (req, res) => {
  try {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

    if (state === null || state !== storedState) return res.redirect('/error=state_mismatch');

    res.clearCookie(STATE_KEY);

    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }).toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      }
    }

    const { status, data: { access_token, refresh_token, expires_in } } = await axios(authOptions);

    // return res.status(status).json(data);

    if (status == 200) {
      const queryParams = new URLSearchParams({
        access_token,
        refresh_token,
        expires_in,
      }).toString();

      return res.redirect(`${FRONTEND_URI}?${queryParams}`);
    } else {
      return res.redirect('/error=invalid_token');
    }
  } catch (error) {
    res.send(error);
  }
});

app.listen(8888, () => console.log(`Server started on ${PORT}`));