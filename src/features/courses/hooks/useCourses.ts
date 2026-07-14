import { useState, useCallback } from "react";
import { courseService } from "../services/courseService";
import { Course, CreateCourseRequest, Pagination } from "../types/course";
import { useToast } from "@/hooks/use-toast";

export const useCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchCourses = useCallback(async (page = 1, limit = 10) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await courseService.getCourses(page, limit);
            setCourses(result.data);
            setPagination(result.pagination || null);
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to fetch courses";
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

    const createCourse = async (data: CreateCourseRequest) => {
        setIsLoading(true);
        try {
            await courseService.createCourse(data);
            toast({
                title: "Success",
                description: "Course created successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to create course";
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

    const updateCourse = async (id: string, data: Partial<CreateCourseRequest>) => {
        setIsLoading(true);
        try {
            await courseService.updateCourse(id, data);
            toast({
                title: "Success",
                description: "Course updated successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to update course";
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

    const deleteCourse = async (id: string) => {
        try {
            await courseService.deleteCourse(id);
            setCourses((prev) => prev.filter((c) => c.id !== id));
            toast({
                title: "Success",
                description: "Course deleted successfully",
            });
            return true;
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to delete course";
            toast({
                title: "Error",
                description: message,
                variant: "destructive",
            });
            return false;
        }
    };

    return {
        courses,
        pagination,
        isLoading,
        error,
        fetchCourses,
        createCourse,
        updateCourse,
        deleteCourse,
    };
};
