import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { Lecture, LectureResponse, CreateLectureRequest } from "../types/lecture";

export const lectureService = {
    getLectures: async (filters: { subjectId?: string; batchSubjectId?: string; page?: number; limit?: number }): Promise<LectureResponse> => {
        const queryParams = new URLSearchParams();
        if (filters.subjectId) queryParams.append("subjectId", filters.subjectId);
        if (filters.batchSubjectId) queryParams.append("batchSubjectId", filters.batchSubjectId);
        if (filters.page) queryParams.append("page", filters.page.toString());
        if (filters.limit) queryParams.append("limit", filters.limit.toString());

        const response = await apiClient.get<LectureResponse>(`${INSTITUTION_ENDPOINTS.LECTURES}?${queryParams.toString()}`);
        return response.data;
    },

    createLecture: async (data: CreateLectureRequest): Promise<void> => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("batchSubjectId", data.batchSubjectId);
        formData.append("subjectId", data.subjectId);
        formData.append("facultyId", data.facultyId);
        formData.append("video", data.video);
        formData.append("thumbnail", data.thumbnail);

        await apiClient.post(INSTITUTION_ENDPOINTS.LECTURES, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateLecture: async (id: string, data: { title: string; description: string; facultyId: string; thumbnail?: File | null }): Promise<void> => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("facultyId", data.facultyId);
        if (data.thumbnail) {
            formData.append("thumbnail", data.thumbnail);
        }

        await apiClient.patch(`${INSTITUTION_ENDPOINTS.LECTURES}?lectureId=${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteLecture: async (id: string): Promise<void> => {
        await apiClient.delete(`${INSTITUTION_ENDPOINTS.LECTURES}?lectureId=${id}`);
    },
};
