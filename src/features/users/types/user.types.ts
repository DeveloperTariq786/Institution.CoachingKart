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
export interface InstitutionStudent {
    id: string;
    userId: string;
    batchId: string;
    status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
    joinedAt: string;
    completedAt: string | null;
    feePaid: number;
    discount: number;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        isActive: boolean;
    };
    batch: {
        id: string;
        name: string;
        session: string;
        program: {
            id: string;
            name: string;
            course: {
                id: string;
                name: string;
                icon: string;
                color: string;
            };
        };
    };
}

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
    phone: string;
    password: string;
    batchId: string;
    feePaid: number;
    discount: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
}
