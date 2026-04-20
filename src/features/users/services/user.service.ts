import { apiClient } from '@/core/api';
import { INSTITUTION_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { InstitutionAdmin, InstitutionStudent, ApiResponse, CreateAdminPayload, CreateStudentPayload } from '../types/user.types';

export const userService = {
    getAdmins: async (page = 1, limit = 10): Promise<InstitutionAdmin[]> => {
        const response = await apiClient.get<ApiResponse<InstitutionAdmin[]>>(INSTITUTION_ENDPOINTS.ADMIN_USERS, {
            params: {
                page,
                limit,
            },
        });
        return response.data.data;
    },
    createAdmin: async (payload: CreateAdminPayload): Promise<InstitutionAdmin> => {
        const response = await apiClient.post<ApiResponse<InstitutionAdmin>>(INSTITUTION_ENDPOINTS.ADMIN_USERS, payload);
        return response.data.data;
    },
    getStudents: async (page = 1, limit = 10): Promise<InstitutionStudent[]> => {
        const response = await apiClient.get<ApiResponse<InstitutionStudent[]>>(INSTITUTION_ENDPOINTS.STUDENT, {
            params: {
                page,
                limit,
            },
        });
        return response.data.data;
    },
    createStudent: async (payload: CreateStudentPayload): Promise<any> => {
        const response = await apiClient.post(INSTITUTION_ENDPOINTS.STUDENT, payload);
        return response.data;
    },
};

export default userService;
