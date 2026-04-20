export interface Program {
    id: string;
    name: string;
    courseId: string;
    createdAt: string;
    updatedAt: string;
    course?: {
        name: string;
        institutionId: string;
    };
}

export interface CreateProgramRequest {
    name: string;
    courseId: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface ProgramResponse {
    success: boolean;
    message?: string;
    data?: Program[];
    pagination?: Pagination;
}
