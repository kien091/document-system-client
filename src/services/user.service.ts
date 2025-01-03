import axios from 'axios';
import { authService } from './auth.service';
import { UserProfileResponse } from '@/types/user';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to request header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const userService = {
    async getProfile(): Promise<UserProfileResponse> {
        try {
            const response = await axiosInstance.get<UserProfileResponse>('/users/me');
            return response.data;
        } catch (error: unknown) {
            if ((error as { response?: { status?: number } })?.response?.status === 401) {
                authService.logout();
            }
            throw error;
        }
    }
}; 