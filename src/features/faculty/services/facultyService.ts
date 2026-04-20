import { apiClient } from "@/core/api";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";
import { Faculty, FacultyResponse, CreateFacultyRequest } from "../types/faculty";

export const facultyService = {
    getFaculty: async (): Promise<Faculty[]> => {
        const response = await apiClient.get<FacultyResponse>(INSTITUTION_ENDPOINTS.FACULTY);
        return response.data.data || [];
    },

    createFaculty: async (data: CreateFacultyRequest): Promise<void> => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("experience", data.experience);
        formData.append("tag", data.tag);
        formData.append("description", data.description);
        formData.append("subjectId", data.subjectId);
        if (data.profileimage) {
            formData.append("profileImage", data.profileimage);
        }

        await apiClient.post(INSTITUTION_ENDPOINTS.FACULTY, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteFaculty: async (id: string): Promise<void> => {
        await apiClient.delete(`${INSTITUTION_ENDPOINTS.FACULTY}/${id}`);
    },
};
