export const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expiresIn: 'spotify_expires_in',
  timestamp: 'spotify_timestamp',
}

export const LOCALSTORAGE_VALUES = {
  accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expiresIn: localStorage.getItem(LOCALSTORAGE_KEYS.expiresIn),
  timestamp: localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};
