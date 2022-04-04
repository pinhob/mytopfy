import { LOCALSTORAGE_KEYS } from "./localStorageKeysValues";

export const logout = () => {
  for (const key in LOCALSTORAGE_KEYS) {
    localStorage.removeItem(LOCALSTORAGE_KEYS[key]);
  }

  window.location = window.location.origin;
};
