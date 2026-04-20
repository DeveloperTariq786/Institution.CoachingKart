import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { BannerImage, BannerResponse, CreateBannerRequest } from "../types";

export const bannerService = {
    getBanners: async (): Promise<BannerImage[]> => {
        const response = await apiClient.get<BannerResponse>(INSTITUTION_ENDPOINTS.BANNER);
        return response.data.data || [];
    },

    addBannerItems: async (data: CreateBannerRequest): Promise<void> => {
        const formData = new FormData();

        if (data.items.length === 1) {
            // For Single Banner
            formData.append("images", data.items[0].file);
            formData.append("heading", data.items[0].heading);
            formData.append("description", data.items[0].description);
        } else {
            // For Multiple Banners
            const headings: string[] = [];
            const descriptions: string[] = [];
            data.items.forEach((item) => {
                formData.append("images", item.file);
                headings.push(item.heading);
                descriptions.push(item.description);
            });
            formData.append("headings", JSON.stringify(headings));
            formData.append("descriptions", JSON.stringify(descriptions));
        }

        await apiClient.post(INSTITUTION_ENDPOINTS.BANNER, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteBannerItem: async (id: string): Promise<void> => {
        await apiClient.delete(`${INSTITUTION_ENDPOINTS.BANNER}/${id}`);
    },
};
