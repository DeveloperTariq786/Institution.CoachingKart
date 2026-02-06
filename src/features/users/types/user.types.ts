export interface User {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: string;
}

export interface InstitutionUser {
    id: string;
    userId: string;
    institutionId: string;
    role: string;
    createdAt: string;
    user: User;
}

export type InstitutionAdmin = InstitutionUser;
export type InstitutionStudent = InstitutionUser;

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface CreateAdminPayload {
    name: string;
    email: string;
    password: string;
    institutionRole: 'INSTITUTION_SUPER_ADMIN' | 'INSTITUTION_ADMIN';
}

export interface CreateStudentPayload {
    name: string;
    email: string;
    password: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
}
