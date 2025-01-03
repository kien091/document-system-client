export interface UserProfile {
    userId: string;
    username: string;
    avatar: string;
    background: string;
    fullName: string;
    email: string;
    phone: string | null;
    position: string | null;
    role: string;
    status: string;
    department: string | null;
}

export interface UserProfileResponse {
    message: string;
    data: UserProfile;
} 