import axios from 'axios';
import {store} from 'store/reducer';

// Creating an axios instance
const API = axios.create({ baseURL: process.env.REACT_APP_API });

// Adding a request interceptor to the axios instance
API.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // get the token from your redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // add the Authorization header to the request
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;