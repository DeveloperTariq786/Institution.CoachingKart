import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { Batch, BatchResponse, CreateBatchRequest, Pagination } from "../types/batch";

export const batchService = {
    getBatches: async (filters: { programId?: string; institutionId?: string }, page = 1, limit = 10): Promise<{ data: Batch[]; pagination?: Pagination }> => {
        let url = INSTITUTION_ENDPOINTS.BATCHES;
        const params = new URLSearchParams();

        if (filters.institutionId) {
            params.append("institutionId", filters.institutionId);
        } else if (filters.programId) {
            params.append("programId", filters.programId);
        }

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        const fullUrl = `${url}?${params.toString()}`;
        const response = await apiClient.get<BatchResponse>(fullUrl);
        return {
            data: response.data.data || [],
            pagination: response.data.pagination
        };
    },

    createBatch: async (data: CreateBatchRequest): Promise<void> => {
        await apiClient.post(INSTITUTION_ENDPOINTS.BATCHES, data);
    },

    updateBatch: async (id: string, data: Partial<CreateBatchRequest>): Promise<void> => {
        await apiClient.patch(`${INSTITUTION_ENDPOINTS.BATCHES}/${id}`, data);
    },

    deleteBatch: async (id: string): Promise<void> => {
        await apiClient.delete(`${INSTITUTION_ENDPOINTS.BATCHES}/${id}`);
    },
};
