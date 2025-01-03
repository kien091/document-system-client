export interface NotificationUser {
    userId: string;
    username: string;
    avatar: string;
    fullName: string;
}

export interface Notification {
    notificationId: string;
    message: string;
    timestamp: string;
    read: boolean;
    user: NotificationUser;
}

export interface NotificationResponse {
    message: string;
    data: {
        unreadCount: number;
        notifications: Notification[];
    };
} 