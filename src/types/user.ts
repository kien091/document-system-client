interface Department {
    departmentId: string;
    name: string;
    hotline: string;
    description?: string;
    location: string;
}

export interface UpdateProfileRequest {
    userName?: string;
    fullName?: string;
    position?: string;
    email?: string;
    phone?: string;
    avatarFile?: File;
    backgroundFile?: File;
}

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED';
export type UserRole = 'ADMIN' | 'USER';

export interface UserProfile {
    userId: string;
    username: string;
    avatar: string;
    background: string;
    fullName: string;
    email: string;
    phone: string | null;
    position: string | null;
    role: UserRole;
    status: UserStatus;
    department: Department | null;
}

export interface UserProfileResponse {
    message: string;
    data: UserProfile;
} 