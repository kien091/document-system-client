export interface Department {
    departmentId: string;
    name: string;
    hotline: string;
    description: string;
    location: string;
}

export interface DepartmentResponse {
    message: string;
    data: Department;
}
