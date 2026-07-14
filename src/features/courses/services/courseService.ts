import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { Course, CreateCourseRequest, CourseResponse, Pagination } from "../types/course";

export const courseService = {
    getCourses: async (page = 1, limit = 10): Promise<{ data: Course[]; pagination?: Pagination }> => {
        const response = await apiClient.get<CourseResponse>(`${INSTITUTION_ENDPOINTS.COURSES}?page=${page}&limit=${limit}`);
        return {
            data: response.data.data || [],
            pagination: response.data.pagination
        };
    },

    createCourse: async (data: CreateCourseRequest): Promise<void> => {
        await apiClient.post(INSTITUTION_ENDPOINTS.COURSES, data);
    },

    updateCourse: async (id: string, data: Partial<CreateCourseRequest>): Promise<void> => {
        await apiClient.patch(`${INSTITUTION_ENDPOINTS.COURSES}?courseId=${id}`, data);
    },

    deleteCourse: async (id: string): Promise<void> => {
        await apiClient.delete(`${INSTITUTION_ENDPOINTS.COURSES}?courseId=${id}`);
    },
};
