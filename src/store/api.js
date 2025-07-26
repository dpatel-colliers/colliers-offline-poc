import axios from 'axios';
const BASE_URL = 'https://688126ca66a7eb81224a3c8f.mockapi.io/';

const api = axios.create({
    baseURL: BASE_URL,
    config: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
