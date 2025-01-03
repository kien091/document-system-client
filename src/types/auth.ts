export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    id: string;
    username: string;
    email: string;
    role: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

export interface RegisterRequest {
    email: string;
    username: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}

interface Document {
    documentId: string;
    number: string;
    title: string;
    content: string;
    issueDate: string;
    receivedDate?: string;
    sendDate?: string;
    type: string;
    status: string;
    attachment: string;
    keywords?: string;
    urgencyLevel: string;
    expirationDate: string;
    logNote?: string;
    createdAt: string;
    updatedAt: string;
}

interface Folder {
    folderId: string;
    name: string;
}

interface Department {
    departmentId: string;
    name: string;
    description?: string;
    location: string;
}

interface Distribution {
    distributionId: string;
    status: string;
    note?: string;
    timestamp: string;
}

interface Tracking {
    trackingId: string;
    entityType: string;
    entityId: string;
    action: string;
    description?: string;
    timestamp: string;
}

export interface RegisterResponse {
    message: string;
    data: {
        userId: string;
        username: string;
        password: string;
        avatar: string;
        background: string;
        fullName: string;
        email: string;
        phone: string | null;
        position: string | null;
        role: string;
        status: string;
        folders: Folder[] | null;
        documents: Document[] | null;
        department: Department | null;
        sentDistributions: Distribution[] | null;
        receivedDistributions: Distribution[] | null;
        trackings: Tracking[] | null;
    }
}

export interface SendOTPRequest {
    to: string;
}

export interface SendOTPResponse {
    message: string;
    data: {
        success: boolean;
        message: string;
    }
}

export interface VerifyOTPRequest {
    email: string;
    otp: string;
}

export interface VerifyOTPResponse {
    message: string;
    data: {
        resetToken: string;
    }
}

export interface ResetPasswordRequest {
    email: string;
    resetToken: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    message: string;
    data: null;
}