export interface Course {
    id: string;
    name: string;
    icon: string;
    color: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCourseRequest {
    name: string;
    icon: string;
    color: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface CourseResponse {
    success: boolean;
    message?: string;
    data?: Course[];
    pagination?: Pagination;
}
