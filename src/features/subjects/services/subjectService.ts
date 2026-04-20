import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { Subject, SubjectResponse, CreateSubjectRequest, Pagination } from "../types/subject";

export const subjectService = {
    getSubjects: async (page = 1, limit = 10): Promise<{ data: Subject[]; pagination?: Pagination }> => {
        const response = await apiClient.get<SubjectResponse>(`${INSTITUTION_ENDPOINTS.SUBJECTS}?page=${page}&limit=${limit}`);
        return {
            data: response.data.data || [],
            pagination: response.data.pagination
        };
    },

    createSubject: async (data: CreateSubjectRequest): Promise<void> => {
        await apiClient.post(INSTITUTION_ENDPOINTS.SUBJECTS, data);
    },

    updateSubject: async (id: string, data: Partial<CreateSubjectRequest>): Promise<void> => {
        await apiClient.patch(`${INSTITUTION_ENDPOINTS.SUBJECTS}/${id}`, data);
    },

    deleteSubject: async (id: string): Promise<void> => {
        await apiClient.delete(`${INSTITUTION_ENDPOINTS.SUBJECTS}/${id}`);
    },
};
