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
    type: `INCOMING` | `OUTGOING` | `INTERNAL` | `UNKNOWN`;
    status: `PENDING` | `PROCESSING` | `COMPLETED` | `REJECTED`;
    urgencyLevel: `IMPORTANT` | `NORMAL`;
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

export interface ApiResponse {
    message: string;
    data: PaginationResponse;
}

export interface DocumentByIdResponse {
    message: string;
    data: Document;
}

