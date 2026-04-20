export interface Batch {
    id: string;
    session: string;
    name: string;
    description: string;
    academicFee: string;
    programId: string;
    createdAt: string;
    updatedAt: string;
    program?: {
        name: string;
        courseId?: string;
        course?: {
            name: string;
        };
    };
    startDate?: string; // Optional if not in API response
    endDate?: string;   // Optional if not in API response
    capacity?: number;
    subjects?: {
        batchSubjectId: string;
        batchId: string;
        subjectId: string;
        createdAt: string;
        subject: {
            id: string;
            name: string;
            icon?: string;
        };
    }[];
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface CreateBatchRequest {
    session: string;
    name: string;
    description: string;
    academicFee: string;
    programId: string;
    subjectIds: string[];
}

export interface BatchResponse {
    success: boolean;
    data: Batch[];
    pagination?: Pagination;
    message?: string;
}
