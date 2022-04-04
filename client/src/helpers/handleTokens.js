import axios from "axios";
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from "./localStorageKeysValues";


const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;

  if (!accessToken || !timestamp) {
    return false;
  }

  const millisecondsSinceTokenCreated = Date.now() - Number(timestamp);
  return (millisecondsSinceTokenCreated / 1000) > Number(expireTime);
}

const refreshToken = async () => {
  try {
    const tokenTimeExpired = (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000;

    if (!LOCALSTORAGE_VALUES.refreshToken
      || LOCALSTORAGE_VALUES.refreshToken === 'undefined'
      || tokenTimeExpired) {
      console.log('No refresh token avaliable');
    }

    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
    window.localStorage.setItem(LOCALSTORAGE_VALUES.timestamp, Date.now());

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expiresIn]: urlParams.get('expires_in'),
  }


  const hasError = urlParams.get('error');

  if (hasError || hasTokenExpired() | LOCALSTORAGE_VALUES.accessToken === 'undefined') {
    refreshToken();
  }

  if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }

    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  return false;
}

export const accessToken = getAccessToken();