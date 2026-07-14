import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bannerService } from "../services/bannerService";
import { toast } from "sonner";
import { UpdateBannerRequest } from "../types";

export const useBanner = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["institution-banners"],
        queryFn: bannerService.getBanners,
    });

    const addMutation = useMutation({
        mutationFn: bannerService.addBannerItems,
        onSuccess: () => {
            toast.success("Banners added successfully");
            queryClient.invalidateQueries({ queryKey: ["institution-banners"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to add banners");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ bannerId, data }: { bannerId: string; data: UpdateBannerRequest }) => 
            bannerService.updateBannerItem(bannerId, data),
        onSuccess: () => {
            toast.success("Banner updated successfully");
            queryClient.invalidateQueries({ queryKey: ["institution-banners"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update banner");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: bannerService.deleteBannerItem,
        onSuccess: () => {
            toast.success("Banner deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["institution-banners"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete banner");
        },
    });

    return {
        banners: query.data || [],
        isLoading: query.isLoading,
        isError: query.isError,
        addBannerItems: addMutation.mutateAsync,
        isAdding: addMutation.isPending,
        updateBannerItem: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteBannerItem: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
    };
};
