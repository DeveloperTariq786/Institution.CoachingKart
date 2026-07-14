import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { Program, CreateProgramRequest, ProgramResponse, Pagination } from "../types/program";

export const programService = {
    getPrograms: async (filters: { courseId?: string; institutionId?: string }, page = 1, limit = 10): Promise<{ data: Program[]; pagination?: Pagination }> => {
        const params = new URLSearchParams();
        if (filters.institutionId) params.append("institutionId", filters.institutionId);
        if (filters.courseId) params.append("courseId", filters.courseId);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        const url = `${INSTITUTION_ENDPOINTS.PROGRAMS}?${params.toString()}`;

        const response = await apiClient.get<ProgramResponse>(url);
        return {
            data: response.data.data || [],
            pagination: response.data.pagination
        };
    },

    createProgram: async (data: CreateProgramRequest): Promise<void> => {
        await apiClient.post(INSTITUTION_ENDPOINTS.PROGRAMS, data);
    },

    updateProgram: async (id: string, data: Partial<CreateProgramRequest>): Promise<void> => {
        await apiClient.patch(`${INSTITUTION_ENDPOINTS.PROGRAMS}?programId=${id}`, data);
    },

    deleteProgram: async (id: string): Promise<void> => {
        await apiClient.delete(`${INSTITUTION_ENDPOINTS.PROGRAMS}?programId=${id}`);
    },
};
