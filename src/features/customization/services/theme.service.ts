
import { apiClient } from '@/core/api';
import { INSTITUTION_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { InstitutionTheme, InstitutionThemeResponse, ApiResponse } from '../types/theme.types';

export const themeService = {
    getTheme: async (): Promise<InstitutionThemeResponse> => {
        const response = await apiClient.get<ApiResponse<InstitutionThemeResponse>>(INSTITUTION_ENDPOINTS.THEME);
        return response.data.data;
    },

    updateTheme: async (theme: InstitutionTheme): Promise<InstitutionThemeResponse> => {
        const response = await apiClient.post<ApiResponse<InstitutionThemeResponse>>(INSTITUTION_ENDPOINTS.THEME, theme);
        return response.data.data;
    }
};

export default themeService;
