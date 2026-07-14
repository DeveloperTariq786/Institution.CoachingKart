import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { galleryService } from "../services/galleryService";
import { toast } from "sonner";
import { UpdateGalleryRequest } from "../types";

export const useGallery = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["institution-gallery"],
        queryFn: galleryService.getGallery,
    });

    const addMutation = useMutation({
        mutationFn: galleryService.addGalleryItems,
        onSuccess: () => {
            toast.success("Gallery items added successfully");
            queryClient.invalidateQueries({ queryKey: ["institution-gallery"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to add gallery items");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ galleryId, data }: { galleryId: string; data: UpdateGalleryRequest }) => 
            galleryService.updateGalleryItem(galleryId, data),
        onSuccess: () => {
            toast.success("Image updated successfully");
            queryClient.invalidateQueries({ queryKey: ["institution-gallery"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update image");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: galleryService.deleteGalleryItem,
        onSuccess: () => {
            toast.success("Image deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["institution-gallery"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete image");
        },
    });

    return {
        gallery: query.data || [],
        isLoading: query.isLoading,
        isError: query.isError,
        addGalleryItems: addMutation.mutateAsync,
        isAdding: addMutation.isPending,
        updateGalleryItem: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteGalleryItem: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
    };
};
