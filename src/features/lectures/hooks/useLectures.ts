import { useState, useCallback } from "react";
import { lectureService } from "../services/lectureService";
import { CreateLectureRequest } from "../types/lecture";
import { useToast } from "@/hooks/use-toast";
import { useLectureStore } from "../store/lecture.store";

export const useLectures = () => {
    const { lectures, pagination, hasLoaded, lastFilters, setLectures, deleteLecture: removeLecture, clearLectures } = useLectureStore();
    const [isFetching, setIsFetching] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchLectures = useCallback(async (filters: { subjectId?: string; batchSubjectId?: string; page?: number; limit?: number }, force = false) => {
        // Prevent calls without required filters to avoid backend errors
        if (!filters.subjectId && !filters.batchSubjectId) {
            return;
        }

        const storeState = useLectureStore.getState();
        const isSameFilters = storeState.lastFilters &&
            storeState.lastFilters.subjectId === filters.subjectId &&
            storeState.lastFilters.batchSubjectId === filters.batchSubjectId &&
            storeState.lastFilters.page === (filters.page || 1);

        if (storeState.hasLoaded && isSameFilters && !force) {
            return;
        }

        setIsFetching(true);
        setError(null);
        try {
            const response = await lectureService.getLectures(filters);
            setLectures(response.data, response.pagination, {
                subjectId: filters.subjectId,
                batchSubjectId: filters.batchSubjectId,
                page: filters.page || 1
            });
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch lectures";
            setError(message);
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsFetching(false);
        }
    }, [toast, setLectures]);

    const createLecture = async (data: CreateLectureRequest) => {
        setIsProcessing(true);
        try {
            await lectureService.createLecture(data);
            clearLectures();
            toast({
                title: "Success",
                description: "Lecture created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to create lecture";
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

    const updateLecture = async (id: string, data: { title: string; description: string; facultyId: string; thumbnail?: File | null }) => {
        setIsProcessing(true);
        try {
            await lectureService.updateLecture(id, data);
            clearLectures();
            toast({
                title: "Success",
                description: "Lecture updated successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to update lecture";
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

    const deleteLecture = async (id: string) => {
        setIsProcessing(true);
        try {
            await lectureService.deleteLecture(id);
            removeLecture(id);
            toast({
                title: "Success",
                description: "Lecture deleted successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete lecture";
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
        lectures,
        isFetching,
        isProcessing,
        isLoading: isFetching || isProcessing,
        hasLoaded,
        error,
        pagination,
        fetchLectures,
        createLecture,
        updateLecture,
        deleteLecture,
    };
};
