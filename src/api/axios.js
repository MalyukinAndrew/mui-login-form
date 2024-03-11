import axios from 'axios';

export const API_URL = 'https://auth-qa.qencode.com/v1/auth';

const api = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error.response.data.detail);
    } else {
      return Promise.reject(
        `${error.response.data.detail.map((errorMessage) => {
          return `
      field: ${errorMessage.field_name} error: ${errorMessage.error}`;
        })}`,
      );
    }
  },
);

export default api;
