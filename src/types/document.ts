export enum DocumentType {
    INCOMING = "INCOMING",
    OUTGOING = "OUTGOING",
    INTERNAL = "INTERNAL",
    UNKNOWN = "UNKNOWN"
}

export enum DocumentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
}

export enum UrgencyLevel {
    NORMAL = "NORMAL",
    IMPORTANT = "IMPORTANT"
}

export enum SecretLevel {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface CreateDocumentRequest {
    number: string;
    title: string;
    content: string;
    issueDate: string | null;
    receivedDate: string | null;
    sendDate: string | null;
    agencyUnit: string;
    expirationDate: string | null;
    type: DocumentType;
    status: DocumentStatus;
    urgencyLevel: UrgencyLevel;
    keywords?: string;
    logNote?: string;
    file: File;
    userId: string;
    secretLevel: SecretLevel;
}

export interface Department {
    id: string;
    name: string;
    hotline: string;
    description: string;
    location: string;
}

export interface Creator {
    userId: string;
    avatar: string;
    background: string;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    position: string;
    role: string;
    status: string;
    department: Department;
}

export interface Document {
    documentId: string;
    number: string;
    title: string;
    content: string;
    type: DocumentType;
    status: DocumentStatus;
    urgencyLevel: UrgencyLevel;
    secretLevel: SecretLevel;
    agencyUnit: string;
    attachment: string;
    keywords: string;
    logNote: string;
    issueDate: string;
    receivedDate: string;
    sendDate: string;
    expirationDate: string;
    createdAt: string;
    creator: Creator;
}

export interface DocumentResponse {
    message: string;
    data: {
        content: Document[];
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
    };
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface statusCounts {
    PENDING: number;
    PROCESSING: number;
    COMPLETED: number;
    REJECTED: number;
}

export interface PaginationResponse {
    content: Document[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
    statusCounts: statusCounts;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface DocumentByIdResponse {
    message: string;
    data: Document;
}

export interface SearchRequest {
    keyword: string;
    startDate: string | null;
    endDate: string | null;
    page: number;
    size: number;
    sortBy: string;
    sortDirection: 'ASC' | 'DESC';
    type: 'INCOMING' | 'OUTGOING';
}

export interface AgencyUnitSuggestion {
    suggestions: string[];
}

export interface DocumentFilterParams {
    type: 'INCOMING' | 'OUTGOING';
    agencyUnit?: string;
    status?: DocumentStatus;
    urgencyLevel?: UrgencyLevel;
    secretLevel?: SecretLevel;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}

