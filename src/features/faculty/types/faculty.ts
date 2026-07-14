export interface Faculty {
    id: string;
    name: string;
    profileImage?: string;
    experience: string;
    tag: string;
    description: string;
    institutionId: string;
    subjectId: string;
    createdAt: string;
    updatedAt: string;
    facultyBatchSubjects: any[];
    subject?: {
        id: string;
        name: string;
        icon: string;
        institutionId: string;
        createdAt: string;
        updatedAt: string;
    };
    _count?: {
        lectures: number;
    };
}

export interface CreateFacultyRequest {
    name: string;
    experience: string;
    tag: string;
    description: string;
    subjectId: string;
    profileimage?: File;
}

export interface FacultyResponse {
    success: boolean;
    data: Faculty[];
    message?: string;
}

export interface UpdateFacultyRequest {
    name?: string;
    experience?: number;
    tag?: string;
    description?: string;
    subjectId?: string;
}

