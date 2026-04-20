import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { Resource, CreateResourceRequest } from "../types";

export interface ResourceResponse {
    success: boolean;
    data: Resource[];
}

export const resourceService = {
    getResources: async (lectureId: string): Promise<ResourceResponse> => {
        const response = await apiClient.get<ResourceResponse>(
            `${INSTITUTION_ENDPOINTS.RESOURCES}?lectureId=${lectureId}`
        );
        return response.data;
    },

    createResources: async (data: CreateResourceRequest): Promise<void> => {
        const formData = new FormData();
        formData.append("lectureId", data.lectureId);

        if (data.textContent) {
            data.textContent.forEach((text) => formData.append("textContent", text));
        }

        if (data.files) {
            data.files.forEach((file) => formData.append("files", file));
        }

        if (data.externalUrl) {
            data.externalUrl.forEach((url) => formData.append("externalUrl", url));
        }

        await apiClient.post(INSTITUTION_ENDPOINTS.RESOURCES, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
