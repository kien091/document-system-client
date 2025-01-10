import { axiosInstance } from '@/lib/axios';
import { authService } from './auth.service';
import { UserProfileResponse } from '@/types/user';

export const userService = {
    getProfile: async (): Promise<UserProfileResponse> => {
        try {
            const response = await axiosInstance.get<UserProfileResponse>('/users/me');
            return response.data;
        } catch (error: unknown) {
            if ((error as { response?: { status?: number } })?.response?.status === 401) {
                authService.logout();
            }
            throw error;
        }
    },

    updateProfile: async (id: string, data: FormData): Promise<UserProfileResponse> => {
        try {
            for (const pair of data.entries()) {
                console.log("FormData entry:", pair[0], pair[1]);
            }
            const response = await axiosInstance.put<UserProfileResponse>(`/users/update-profile/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: unknown) {
            throw error;
        }
    },
}; 