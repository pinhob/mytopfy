export const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expiresTime: 'spotify_expires_time',
  timestamp: 'spotify_timestamp',
}

export const LOCALSTORAGE_VALUES = {
  accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expiresTime: localStorage.getItem(LOCALSTORAGE_KEYS.expiresTime),
  timestamp: localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};
