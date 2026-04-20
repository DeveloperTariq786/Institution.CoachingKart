export interface Lecture {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: number;
    order: number;
    subjectId: string;
    facultyId: string;
    createdAt: string;
    updatedAt: string;
    faculty: {
        name: string;
        profileImage?: string;
    };
    _count?: {
        resources: number;
    };
}

export interface CreateLectureRequest {
    title: string;
    description: string;
    batchSubjectId: string;
    subjectId: string;
    facultyId: string;
    video: File;
    thumbnail: File;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface LectureResponse {
    success: boolean;
    data: Lecture[];
    pagination: Pagination;
}
