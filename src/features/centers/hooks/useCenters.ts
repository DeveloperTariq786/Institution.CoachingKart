import { useState, useCallback } from "react";
import { centerService } from "../services/centerService";
import { Center, CreateCenterRequest } from "../types/center";
import { useToast } from "@/hooks/use-toast";

export const useCenters = () => {
    const [centers, setCenters] = useState<Center[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchCenters = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await centerService.getCenters();
            setCenters(response.data);
            setHasLoaded(true);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch centers";
            setError(message);
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const createCenter = async (data: CreateCenterRequest) => {
        setIsProcessing(true);
        try {
            await centerService.createCenter(data);
            toast({
                title: "Success",
                description: "Center created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create center";
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        centers,
        isLoading,
        isProcessing,
        hasLoaded,
        error,
        fetchCenters,
        createCenter,
    };
};
