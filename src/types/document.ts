export interface Department {
    id: string;
    name: string;
    location: string;
}

export interface Creator {
    userId: string;
    username: string;
    fullName: string;
    email: string;
    position: string;
    avatar: string;
    department: Department;
}

export interface Document {
    documentId: string;
    number: string;
    title: string;
    content: string;
    type: `INCOMING` | `OUTGOING` | `INTERNAL` | `UNKNOWN`;
    status: `DRAFT` | `PENDING` | `PROCESSING` | `COMPLETED`;
    urgencyLevel: `IMPORTANT` | `NORMAL`;
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
}

export interface ApiResponse {
    message: string;
    data: PaginationResponse;
}

