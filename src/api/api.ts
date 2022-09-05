import axios from 'axios';

const baseURL = 'https://api.giphy.com/v1/gifs';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params['api_key'] = process.env.REACT_APP_API_KEY;

  return config;
});

export default API;
