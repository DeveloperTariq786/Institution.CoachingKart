import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { GalleryImage, GalleryResponse, CreateGalleryRequest, UpdateGalleryRequest } from "../types";

export const galleryService = {
    getGallery: async (): Promise<GalleryImage[]> => {
        const response = await apiClient.get<GalleryResponse>(INSTITUTION_ENDPOINTS.GALLERY);
        return response.data.data || [];
    },

    addGalleryItems: async (data: CreateGalleryRequest): Promise<void> => {
        const formData = new FormData();

        if (data.items.length === 1) {
            // For Single Image
            formData.append("images", data.items[0].file);
            formData.append("tag", data.items[0].tag);
        } else {
            // For Multiple Images
            const tags: string[] = [];
            data.items.forEach((item) => {
                formData.append("images", item.file);
                tags.push(item.tag);
            });
            formData.append("tags", JSON.stringify(tags));
        }

        await apiClient.post(INSTITUTION_ENDPOINTS.GALLERY, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateGalleryItem: async (galleryId: string, data: UpdateGalleryRequest): Promise<void> => {
        const formData = new FormData();
        if (data.tag) formData.append("tag", data.tag);
        if (data.image) formData.append("image", data.image);

        await apiClient.patch(INSTITUTION_ENDPOINTS.GALLERY_UPDATE, formData, {
            params: {
                galleryId,
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteGalleryItem: async (galleryId: string): Promise<void> => {
        await apiClient.delete(INSTITUTION_ENDPOINTS.GALLERY_DELETE, {
            params: {
                galleryId,
            },
        });
    },
};
