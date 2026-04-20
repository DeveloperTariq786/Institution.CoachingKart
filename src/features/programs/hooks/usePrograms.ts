import { useState, useCallback } from "react";
import { programService } from "../services/programService";
import { CreateProgramRequest } from "../types/program";
import { useToast } from "@/hooks/use-toast";
import { useProgramStore } from "../store/program.store";

export const usePrograms = () => {
    const { programs, pagination, hasLoaded, lastFilters, setPrograms, removeProgram } = useProgramStore();
    const [isFetching, setIsFetching] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchPrograms = useCallback(async (filters: { courseId?: string; institutionId?: string }, page = 1, limit = 10, force = false) => {
        // Guard: Don't fetch if already loaded same filters
        const isSameFilters = lastFilters &&
            lastFilters.courseId === filters.courseId &&
            lastFilters.institutionId === filters.institutionId &&
            lastFilters.page === page;

        if (hasLoaded && isSameFilters && !force && programs.length > 0) {
            return;
        }

        setIsFetching(true);
        setError(null);
        try {
            const result = await programService.getPrograms(filters, page, limit);
            setPrograms(result.data, result.pagination || null, { ...filters, page });
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch programs";
            setError(message);
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsFetching(false);
        }
    }, [toast, hasLoaded, lastFilters, programs.length, setPrograms]);

    const createProgram = async (data: CreateProgramRequest) => {
        setIsProcessing(true);
        try {
            await programService.createProgram(data);
            toast({
                title: "Success",
                description: "Program created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create program";
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

    const deleteProgram = async (id: string) => {
        setIsProcessing(true);
        try {
            await programService.deleteProgram(id);
            removeProgram(id);
            toast({
                title: "Success",
                description: "Program deleted successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete program";
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
        programs,
        pagination,
        isFetching,
        isProcessing,
        isLoading: isFetching || isProcessing,
        hasLoaded,
        error,
        fetchPrograms,
        createProgram,
        deleteProgram,
    };
};
