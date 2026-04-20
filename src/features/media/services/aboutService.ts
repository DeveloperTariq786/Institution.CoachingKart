import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { AboutData, AboutResponse, UpdateAboutRequest } from "../types";

export const aboutService = {
    getAbout: async (): Promise<AboutData | null> => {
        const response = await apiClient.get<AboutResponse>(INSTITUTION_ENDPOINTS.ABOUT);
        return response.data.data;
    },

    updateAbout: async (data: UpdateAboutRequest): Promise<AboutData> => {
        const formData = new FormData();
        
        // Add basic text fields
        formData.append("title", data.title || "");
        formData.append("description", data.description || "");
        
        // Handle image - only append if it's a File object (a new upload)
        // If it's a string, it's just the existing URL which the backend already has
        if (data.image instanceof File) {
            formData.append("image", data.image);
        }
        
        formData.append("visionTitle", data.visionTitle || "Our Vision");
        formData.append("visionContent", data.visionContent || "");
        formData.append("missionTitle", data.missionTitle || "Our Mission");
        formData.append("missionContent", data.missionContent || "");

        const response = await apiClient.post<AboutResponse>(INSTITUTION_ENDPOINTS.ABOUT, formData, {
            headers: {
                "Content-Type": undefined, // Let Axios/Browser handle this for FormData
            },
        });
        return response.data.data;
    },
};
