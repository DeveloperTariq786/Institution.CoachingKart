import { useState, useCallback } from "react";
import { resultService } from "../services/resultService";
import { Result, BulkResultRequest, UpdateResultRequest } from "../types";
import { useToast } from "@/hooks/use-toast";

export const useResults = () => {
    const [results, setResults] = useState<Result[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
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

    const updateResult = async (resultId: string, data: UpdateResultRequest) => {
        setIsProcessing(true);
        try {
            await resultService.updateResult(resultId, data);
            toast({
                title: "Success",
                description: "Result updated successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update result";
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

    const deleteResult = async (id: string) => {
        setIsProcessing(true);
        try {
            await resultService.deleteResult(id);
            setResults((prev) => prev.filter((r) => r.id !== id));
            toast({
                title: "Success",
                description: "Result deleted successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete result";
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
        results,
        isLoading,
        isProcessing,
        error,
        fetchResults,
        createResults,
        updateResult,
        deleteResult,
    };
};

