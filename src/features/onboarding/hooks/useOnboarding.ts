/**
 * useOnboarding Hook
 */

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { showErrorToast } from '@/core/errors';
import { onboardingService } from '../services/onboarding.service';
import { OnboardingRequest, OnboardingResponse } from '../types';

interface UseOnboardingOptions {
    onSuccess?: (response: OnboardingResponse) => void;
    onError?: (error: unknown) => void;
}

/**
 * Hook for managing the onboarding mutation
 */
export function useOnboarding(options?: UseOnboardingOptions) {
    return useMutation({
        mutationFn: (data: OnboardingRequest) => onboardingService.registerInstitution(data),
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message || 'Registration successful!');
                options?.onSuccess?.(response);
            } else {
                toast.error(response.message || 'Registration failed');
            }
        },
        onError: (error) => {
            showErrorToast(error);
            options?.onError?.(error);
        },
    });
}

export default useOnboarding;
