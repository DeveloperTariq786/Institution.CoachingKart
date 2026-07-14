import { useState, useCallback } from "react";
import { batchService } from "../services/batchService";
import { CreateBatchRequest } from "../types/batch";
import { useToast } from "@/hooks/use-toast";
import { useBatchStore } from "../store/batch.store";

export const useBatches = () => {
    const { batches, pagination, hasLoaded, setBatches, deleteBatch: removeBatch, clearBatches } = useBatchStore();
    const [isFetching, setIsFetching] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchBatches = useCallback(async (filters: { programId?: string; institutionId?: string }, page = 1, limit = 10, force = false) => {
        const storeState = useBatchStore.getState();
        const isSameFilters = storeState.lastFilters &&
            storeState.lastFilters.programId === filters.programId &&
            storeState.lastFilters.institutionId === filters.institutionId &&
            storeState.lastFilters.page === page;

        // Only fetch if not already loaded, or if force is true, or if filters changed
        if (storeState.hasLoaded && isSameFilters && !force) {
            return;
        }

        setIsFetching(true);
        setError(null);
        try {
            const result = await batchService.getBatches(filters, page, limit);
            setBatches(result.data, result.pagination || null, {
                programId: filters.programId,
                institutionId: filters.institutionId,
                page
            });
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch batches";
            setError(message);
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsFetching(false);
        }
    }, [toast, hasLoaded, batches.length, setBatches]);

    const createBatch = async (data: CreateBatchRequest) => {
        setIsProcessing(true);
        try {
            await batchService.createBatch(data);
            clearBatches();
            toast({
                title: "Success",
                description: "Batch created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to create batch";
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

    const updateBatch = async (id: string, data: Partial<CreateBatchRequest>) => {
        setIsProcessing(true);
        try {
            await batchService.updateBatch(id, data);
            clearBatches();
            toast({
                title: "Success",
                description: "Batch updated successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update batch";
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

    const deleteBatch = async (id: string) => {
        setIsProcessing(true);
        try {
            await batchService.deleteBatch(id);
            removeBatch(id);
            toast({
                title: "Success",
                description: "Batch deleted successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete batch";
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
        batches,
        isFetching,
        isProcessing,
        isLoading: isFetching || isProcessing,
        hasLoaded,
        error,
        pagination,
        fetchBatches,
        createBatch,
        updateBatch,
        deleteBatch,
    };
};
