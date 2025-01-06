import { axiosInstance } from '@/lib/axios';
import { Department, DepartmentResponse } from '@/types/department';

export const departmentService = {
    createDepartment: async (department: Department): Promise<DepartmentResponse> => {
        try {
            const response = await axiosInstance.post<DepartmentResponse>('/departments/create', department);
            return response.data;
        } catch (error) {
            console.error('Error creating department:', error);
            throw error;
        }
    },

    updateDepartment: async (department: Department): Promise<DepartmentResponse> => {
        try {
            const response = await axiosInstance.put<DepartmentResponse>(`/departments/update/${department.departmentId}`, department);
            return response.data;
        } catch (error) {
            console.error('Error updating department:', error);
            throw error;
        }
    },

    addUserToDepartment: async (departmentId: string, userId: string): Promise<DepartmentResponse> => {
        try {
            const response = await axiosInstance.post<DepartmentResponse>(`/departments/add-user?departmentId=${departmentId}&userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error adding user to department:', error);
            throw error;
        }
    },

    removeUserFromDepartment: async (departmentId: string, userId: string): Promise<DepartmentResponse> => {
        try {
            const response = await axiosInstance.post<DepartmentResponse>(`/departments/remove-user?departmentId=${departmentId}&userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error removing user from department:', error);
            throw error;
        }
    },

    getDepartment: async (id: string): Promise<DepartmentResponse> => {
        try {
            const response = await axiosInstance.get<DepartmentResponse>(`/departments/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching department:', error);
            throw error;
        }
    }
}

