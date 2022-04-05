import axios from "axios";
import { accessToken } from "./handleTokens";

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getUserProfile = () => axios.get('/me');

export const getUserTopTracks = (range = 'short_time') => axios.get(`/me/top/tracks?time_range=${range}`);

export const getUserTopArtists = (range = 'short_time') => axios.get(`/me/top/artists?range=${range}`);

export const getUserPlaylists = () => axios.get('/me/playlists');
