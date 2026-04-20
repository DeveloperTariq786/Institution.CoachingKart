import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aboutService } from "../services/aboutService";
import { toast } from "sonner";

export const useAbout = () => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["institution-about"],
        queryFn: aboutService.getAbout,
    });

    const updateMutation = useMutation({
        mutationFn: aboutService.updateAbout,
        onSuccess: () => {
            toast.success("About section updated successfully");
            queryClient.invalidateQueries({ queryKey: ["institution-about"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update about section");
        },
    });

    return {
        about: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        updateAbout: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
    };
};
