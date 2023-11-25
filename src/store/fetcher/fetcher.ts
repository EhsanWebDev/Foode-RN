import axios from 'axios';

export const baseURL = 'https://seashell.chaslay.com/api/v1/customer-api';
// export const baseURL = 'https://indiancorner.chaslay.com/api/v1/customer-api';
// export const baseURL = 'https://shriganesh.chaslay.com/api/v1/customer-api';
const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: commonHeaders,
});

export const setToken = (token: string) => {
  api.defaults.headers.common = {Authorization: `Bearer ${token}`};
};

export default api;
