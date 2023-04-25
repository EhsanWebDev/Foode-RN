import axios from 'axios';

const baseURL = 'https://seashell.chaslay.com/api/v1/customer-api';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers,
});

export const setToken = (token: string) => {
  api.defaults.headers.common = {Authorization: `Bearer ${token}`};
};

export default api;
