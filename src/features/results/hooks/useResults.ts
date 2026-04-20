import { useState, useCallback } from "react";
import { resultService } from "../services/resultService";
import { Result, BulkResultRequest } from "../types";
import { useToast } from "@/hooks/use-toast";

export const useResults = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchResults = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await resultService.getResults();
            setResults(data);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch results";
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

    const createResults = async (data: BulkResultRequest) => {
        setIsLoading(true);
        try {
            await resultService.createResults(data);
            toast({
                title: "Success",
                description: "Results created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create results";
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        results,
        isLoading,
        error,
        fetchResults,
        createResults,
    };
};

