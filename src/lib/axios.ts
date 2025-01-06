import axios from 'axios';
import router from 'next/router';

const API_URL = 'http://localhost:8080/api';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            router.push('/login');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
); 