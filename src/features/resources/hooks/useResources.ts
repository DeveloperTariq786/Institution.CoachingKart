import { useState, useCallback } from "react";
import { useResourceStore } from "../store/resource.store";
import { useToast } from "@/hooks/use-toast";
import { resourceService } from "../services/resourceService";
import { CreateResourceRequest } from "../types";

export const useResources = () => {
    const { resources, hasLoaded, lastLectureId, setResources } = useResourceStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const fetchResources = useCallback(async (lectureId: string, force = false) => {
        const storeState = useResourceStore.getState();
        
        // Clear resources if we're switching to a different lecture to avoid stale UI
        if (storeState.lastLectureId !== lectureId) {
            useResourceStore.getState().clearResources();
        }

        // Re-check state after potential clear
        const currentState = useResourceStore.getState();
        if (currentState.hasLoaded && currentState.lastLectureId === lectureId && !force) {
            return;
        }

        setIsLoading(true);
        try {
            const data = await resourceService.getResources(lectureId);
            
            if (data.success) {
                setResources(data.data, lectureId);
            } else {
                throw new Error("API responded with success: false");
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to fetch resources",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [setResources, toast]);

    const addResources = async (data: CreateResourceRequest) => {
        setIsSubmitting(true);
        try {
            await resourceService.createResources(data);
            toast({
                title: "Success",
                description: "Resources added successfully",
            });
            // Refresh the list after adding
            await fetchResources(data.lectureId, true);
            return true;
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to add resources",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteResource = async (id: string) => {
        setIsLoading(true);
        try {
            await resourceService.deleteResource(id);
            toast({
                title: "Success",
                description: "Resource deleted successfully",
            });
            if (lastLectureId) {
                await fetchResources(lastLectureId, true);
            }
            return true;
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete resource",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        resources,
        isLoading,
        isSubmitting,
        hasLoaded,
        lastLectureId,
        fetchResources,
        addResources,
        deleteResource,
    };
};
