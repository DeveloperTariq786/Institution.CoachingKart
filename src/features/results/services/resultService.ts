import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { BulkResultRequest, Result, ResultResponse, UpdateResultRequest } from "../types";

export const resultService = {
    getResults: async (): Promise<Result[]> => {
        const response = await apiClient.get<ResultResponse>(INSTITUTION_ENDPOINTS.RESULTS);
        return response.data.data || [];
    },

    createResults: async (data: BulkResultRequest): Promise<void> => {
        const formData = new FormData();
        formData.append("results", JSON.stringify(data.results));
        data.profiles.forEach((profile) => {
            formData.append("profiles", profile);
        });

        await apiClient.post(INSTITUTION_ENDPOINTS.RESULTS, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateResult: async (resultId: string, data: UpdateResultRequest): Promise<void> => {
        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        if (data.rank) formData.append("rank", data.rank);
        if (data.score) formData.append("score", data.score);
        if (data.session) formData.append("session", data.session);
        if (data.courseId) formData.append("courseId", data.courseId);
        if (data.enrollmentId) formData.append("enrollmentId", data.enrollmentId);
        if (data.profile) formData.append("profile", data.profile);

        await apiClient.patch(INSTITUTION_ENDPOINTS.RESULTS_UPDATE, formData, {
            params: {
                resultId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteResult: async (resultId: string): Promise<void> => {
        await apiClient.delete(INSTITUTION_ENDPOINTS.RESULTS_DELETE, {
            params: {
                resultId,
            },
        });
    },
};

