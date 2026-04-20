import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { BulkResultRequest, Result, ResultResponse } from "../types";

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
};

