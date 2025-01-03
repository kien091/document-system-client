import axios from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authService = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role
            }));
        }
        return response.data;
    },

    async register(data: RegisterRequest): Promise<RegisterResponse> {
        const response = await axiosInstance.post<RegisterResponse>('/auth/register', data);
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    getToken() {
        return localStorage.getItem('token');
    }
};