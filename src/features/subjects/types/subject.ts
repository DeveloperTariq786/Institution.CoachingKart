export interface Subject {
    id: string;
    name: string;
    icon?: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    batches?: any[];
    _count?: {
        lectures: number;
    };
}

export interface CreateSubjectRequest {
    name: string;
    icon?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface SubjectResponse {
    success: boolean;
    data: Subject[];
    pagination?: Pagination;
    message?: string;
}
