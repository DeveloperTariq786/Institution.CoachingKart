export interface Result {
    id: string;
    name: string;
    profile: string;
    rank: string;
    score: string;
    session: string;
    courseName: string;
    studentName: string;
    batchName: string;
    createdAt: string;
}

export interface ResultResponse {
    success: boolean;
    data: Result[];
}

export interface CreateResultRequest {
    courseId: string;
    enrollmentId: string;
    rank: string;
    score: string;
    session: string;
}

export interface BulkResultRequest {
    results: CreateResultRequest[];
    profiles: File[];
}

