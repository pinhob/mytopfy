import axios from "axios";
import { accessToken } from "./handleTokens";

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getUserProfile = () => axios.get('/me');

export const getUserTopTracks = (time_range = 'short_term') => axios.get(`/me/top/tracks?time_range=${time_range}`);

export const getUserTopArtists = (time_range = 'short_term') => axios.get(`/me/top/artists?time_range=${time_range}`);

export const getUserPlaylists = () => axios.get('/me/playlists');
