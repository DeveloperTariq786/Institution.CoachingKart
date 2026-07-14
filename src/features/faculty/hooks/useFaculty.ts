import { useState, useCallback } from "react";
import { facultyService } from "../services/facultyService";
import { Faculty, CreateFacultyRequest, UpdateFacultyRequest } from "../types/faculty";
import { useToast } from "@/hooks/use-toast";

export const useFaculty = () => {
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchFaculty = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const data = await facultyService.getFaculty();
            setFaculty(data);
            setHasLoaded(true);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch faculty";
            setError(message);
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
        } finally {
            setIsFetching(false);
        }
    }, [toast]);

    const createFaculty = async (data: CreateFacultyRequest) => {
        setIsProcessing(true);
        try {
            await facultyService.createFaculty(data);
            toast({
                title: "Success",
                description: "Faculty created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to create faculty";
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

    const updateFaculty = async (facultyId: string, data: UpdateFacultyRequest) => {
        setIsProcessing(true);
        try {
            await facultyService.updateFaculty(facultyId, data);
            toast({
                title: "Success",
                description: "Faculty updated successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to update faculty";
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

    const deleteFaculty = async (id: string) => {
        setIsProcessing(true);
        try {
            await facultyService.deleteFaculty(id);
            setFaculty((prev) => prev.filter((f) => f.id !== id));
            toast({
                title: "Success",
                description: "Faculty deleted successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete faculty";
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
        faculty,
        isFetching,
        isProcessing,
        isLoading: (isFetching && !hasLoaded) || isFetching || isProcessing,
        hasLoaded,
        error,
        fetchFaculty,
        createFaculty,
        updateFaculty,
        deleteFaculty,
    };
};
