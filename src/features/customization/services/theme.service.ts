
import { apiClient } from '@/core/api';
import { INSTITUTION_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { InstitutionTheme, InstitutionThemeResponse, ApiResponse } from '../types/theme.types';

export const themeService = {
    getThemes: async (): Promise<InstitutionThemeResponse[]> => {
        const response = await apiClient.get<ApiResponse<InstitutionThemeResponse[]>>(INSTITUTION_ENDPOINTS.THEME);
        return response.data.data;
    },

    getActiveTheme: async (): Promise<InstitutionTheme> => {
        const response = await apiClient.get<ApiResponse<InstitutionTheme>>(INSTITUTION_ENDPOINTS.INSTITUTION_THEME);
        return response.data.data;
    },

    updateTheme: async (theme: InstitutionTheme): Promise<InstitutionThemeResponse> => {
        const response = await apiClient.post<ApiResponse<InstitutionThemeResponse>>(INSTITUTION_ENDPOINTS.INSTITUTION_THEME, theme);
        return response.data.data;
    }
};

export default themeService;
