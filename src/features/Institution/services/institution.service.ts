import { apiClient } from '@/core/api';
import { INSTITUTION_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { InstitutionProfile, InstitutionProfileResponse, ApiResponse } from '../types/institution.types';

export const institutionService = {
    updateProfile: async (data: InstitutionProfile) => {
        const formData = new FormData();
        formData.append('institutionName', data.institutionName);
        formData.append('description', data.description);

        if (data.logo instanceof File) {
            formData.append('logo', data.logo);
        }

        if (data.coverimage instanceof File) {
            formData.append('coverImage', data.coverimage);
        }

        formData.append('location', JSON.stringify(data.location));
        formData.append('tuitionEmail', data.tuitionEmail);
        formData.append('tuitionPhone', data.tuitionPhone);

        const response = await apiClient.patch(INSTITUTION_ENDPOINTS.UPDATE_ADMIN, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getProfile: async (): Promise<InstitutionProfile> => {
        const response = await apiClient.get<ApiResponse<InstitutionProfileResponse>>(INSTITUTION_ENDPOINTS.PROFILE_ME);
        const data = response.data.data;

        // Map API response to our local InstitutionProfile type
        return {
            id: data.id,
            institutionName: data.name,
            description: data.description,
            logo: data.logo,
            coverimage: data.coverImage,
            location: data.location,
            tuitionEmail: data.tuitionEmail,
            tuitionPhone: data.tuitionPhone,
        };
    }
};

export default institutionService;
