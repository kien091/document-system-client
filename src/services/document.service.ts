import { axiosInstance } from '@/lib/axios';
import { Document } from '@/types/document';
import { ApiResponse } from '@/types/document';

export const documentService = {
    getRecentDocuments: async (type: string): Promise<Document[]> => {
        try {
            const response = await axiosInstance.get<Document[]>(
                `/documents/recent?type=${type}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching documents:', error);
            return [];
        }
    },

    getIncomingDocuments: async (page: number, size: number = 7): Promise<ApiResponse> => {
        try {
            const response = await axiosInstance.get<ApiResponse>(`/documents/all?page=${page}&size=${size}&type=INCOMING`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    },

    getOutgoingDocuments: async (page: number, size: number = 7): Promise<ApiResponse> => {
        try {
            const response = await axiosInstance.get<ApiResponse>(`/documents/all?page=${page}&size=${size}&type=OUTGOING`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }
    },

    getDocumentById: async (id: string): Promise<Document> => {
        try {
            const response = await axiosInstance.get<Document>(`/documents/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching document:', error);
            throw error;
        }
    }
}; 