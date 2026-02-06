/**
 * Onboarding Service
 */

import { apiClient } from '@/core/api';
import { INSTITUTION_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { OnboardingRequest, OnboardingResponse } from '../types';

/**
 * Register a new institution through the onboarding process
 * @param data - Institution and owner details
 * @returns Success message
 */
export async function registerInstitution(data: OnboardingRequest): Promise<OnboardingResponse> {
    const response = await apiClient.post<OnboardingResponse>(INSTITUTION_ENDPOINTS.ONBOARDING, data);
    return response.data;
}

export const onboardingService = {
    registerInstitution,
};

export default onboardingService;
