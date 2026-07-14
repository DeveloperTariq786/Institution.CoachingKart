import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { CenterResponse, CreateCenterRequest, UpdateCenterRequest } from "../types/center";

export const centerService = {
    getCenters: async (): Promise<CenterResponse> => {
        const response = await apiClient.get<CenterResponse>(INSTITUTION_ENDPOINTS.CENTERS);
        return response.data;
    },
    createCenter: async (data: CreateCenterRequest): Promise<void> => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("image", data.image);
        formData.append("location", JSON.stringify(data.location));

        await apiClient.post(INSTITUTION_ENDPOINTS.CENTERS, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    updateCenter: async (centerId: string, data: UpdateCenterRequest): Promise<void> => {
        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        if (data.phone) formData.append("phone", data.phone);
        if (data.image) formData.append("image", data.image);
        if (data.location) formData.append("location", JSON.stringify(data.location));

        await apiClient.patch(INSTITUTION_ENDPOINTS.CENTERS_UPDATE, formData, {
            params: {
                centerId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    deleteCenter: async (centerId: string): Promise<void> => {
        await apiClient.delete(INSTITUTION_ENDPOINTS.CENTERS_DELETE, {
            params: {
                centerId,
            },
        });
    },
};
