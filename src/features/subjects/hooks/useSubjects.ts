import { useState, useCallback } from "react";
import { subjectService } from "../services/subjectService";
import { CreateSubjectRequest } from "../types/subject";
import { useToast } from "@/hooks/use-toast";
import { useSubjectStore } from "../store/subject.store";

export const useSubjects = () => {
    const { subjects, pagination, hasLoaded, lastLoadedPage, setSubjects, removeSubject } = useSubjectStore();
    const [isFetching, setIsFetching] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchSubjects = useCallback(async (page = 1, limit = 10, force = false) => {
        // Guard: Don't fetch if already loaded same page
        if (hasLoaded && lastLoadedPage === page && !force && subjects.length > 0) {
            return;
        }

        setIsFetching(true);
        setError(null);
        try {
            const result = await subjectService.getSubjects(page, limit);
            setSubjects(result.data, result.pagination || null, page);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch subjects";
            setError(message);
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsFetching(false);
        }
    }, [toast, hasLoaded, lastLoadedPage, subjects.length, setSubjects]);

    const createSubject = async (data: CreateSubjectRequest) => {
        setIsProcessing(true);
        try {
            await subjectService.createSubject(data);
            toast({
                title: "Success",
                description: "Subject created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to create subject";
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

    const deleteSubject = async (id: string) => {
        setIsProcessing(true);
        try {
            await subjectService.deleteSubject(id);
            removeSubject(id);
            toast({
                title: "Success",
                description: "Subject deleted successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete subject";
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
        subjects,
        isFetching,
        isProcessing,
        isLoading: isFetching || isProcessing,
        hasLoaded,
        error,
        pagination,
        fetchSubjects,
        createSubject,
        deleteSubject,
    };
};
