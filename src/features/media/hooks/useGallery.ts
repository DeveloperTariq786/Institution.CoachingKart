import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { galleryService } from "../services/galleryService";
import { toast } from "sonner";

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
        deleteGalleryItem: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
    };
};
