import { axiosInstance } from '@/lib/axios';
import { NotificationResponse } from '@/types/notification';

export const notificationService = {
    getNotifications: async (userId: string): Promise<NotificationResponse> => {
        try {
            const response = await axiosInstance.get<NotificationResponse>(
                `/notifications?userId=${userId}`
            );
            return response.data;
        } catch (error: unknown) {
            if ((error as { response?: { status?: number } })?.response?.status === 401) {
                // Handle unauthorized
            }
            throw error;
        }
    }
}; 