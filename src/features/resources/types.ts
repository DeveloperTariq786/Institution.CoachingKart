export interface Resource {
    id: string;
    order: number;
    fileUrl: string | null;
    textContent: string | null;
    externalUrl: string | null;
    releaseAt: string;
    lectureId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateResourceRequest {
    lectureId: string;
    textContent?: string[];
    files?: File[];
    externalUrl?: string[];
}
