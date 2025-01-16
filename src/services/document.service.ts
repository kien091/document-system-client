import { axiosInstance } from '@/lib/axios';
import { Document, DocumentByIdResponse, PaginationResponse, SearchRequest, CreateDocumentRequest } from '@/types/document';
import { ApiResponse } from '@/types/document';

export const documentService = {
    getRecentDocuments: async (type: string, limit: number = 7): Promise<Document[]> => {
        try {
            const response = await axiosInstance.get<Document[]>(
                `/documents/recent?type=${type}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching documents:', error);
            return [];
        }
    },

    getIncomingDocuments: async (page: number, size: number = 7): Promise<ApiResponse<PaginationResponse>> => {
        try {
            const response = await axiosInstance.get<ApiResponse<PaginationResponse>>(`/documents/all?page=${page}&size=${size}&type=INCOMING`);
            return response.data;
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    },

    getOutgoingDocuments: async (page: number, size: number = 7): Promise<ApiResponse<PaginationResponse>> => {
        try {
            const response = await axiosInstance.get<ApiResponse<PaginationResponse>>(`/documents/all?page=${page}&size=${size}&type=OUTGOING`);
            return response.data;
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    },

    getDocumentById: async (id: string): Promise<DocumentByIdResponse> => {
        try {
            const response = await axiosInstance.get<DocumentByIdResponse>(`/documents/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching document:', error);
            throw error;
        }
    },

    searchDocuments: async (searchRequest: SearchRequest): Promise<PaginationResponse> => {
        try {
            const response = await axiosInstance.post<PaginationResponse>(
                '/documents/search',
                searchRequest
            );
            return response.data;
        } catch (error) {
            console.error('Error searching documents:', error);
            throw error;
        }
    },

    async createDocument(request: CreateDocumentRequest): Promise<Document> {
        const formData = new FormData();

        // Append all fields to formData
        Object.keys(request).forEach(key => {
            if (key === 'file') {
                formData.append('file', request.file);
            } else {
                formData.append(key, request[key as keyof CreateDocumentRequest]?.toString() || '');
            }
        });

        try {
            const response = await axiosInstance.post<Document>('/documents/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating document:', error);
            throw error;
        }
    }
}; 