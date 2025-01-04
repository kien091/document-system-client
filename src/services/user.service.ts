import { axiosInstance } from '@/lib/axios';
import { authService } from './auth.service';
import { UserProfileResponse } from '@/types/user';

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