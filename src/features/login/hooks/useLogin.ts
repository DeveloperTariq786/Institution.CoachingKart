/**
 * useLogin Hook
 * React Query mutation hook for login functionality
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/core/store/auth.store';
import { showErrorToast } from '@/core/errors';
import { authService } from '@/features/login/services/auth.service';
import { LoginRequest, LoginResponse } from '@/features/login/types';
import { ROUTES } from '@/core/routes/paths';

interface UseLoginOptions {
    onSuccess?: () => void;
    redirectTo?: string;
}

/**
 * Login mutation hook
 * Handles login API call, auth state update, and navigation
 */
export function useLogin(options?: UseLoginOptions) {
    const navigate = useNavigate();
    const { setAuth, setLoading } = useAuthStore();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (response: LoginResponse) => {
            const { user, token, context, platformRole, institutionRole } = response.data;
            const role = platformRole || institutionRole || null;

            // Update auth store
            setAuth(user, token, context, role);

            // Show success message
            toast.success(response.message || 'Login successful!');

            // Call custom success handler if provided
            if (options?.onSuccess) {
                options.onSuccess();
            } else {
                // Navigate to dashboard or custom redirect
                navigate(options?.redirectTo || ROUTES.DASHBOARD);
            }
        },
        onError: (error: unknown) => {
            setLoading(false);
            showErrorToast(error);
        },
        onSettled: () => {
            setLoading(false);
        },
    });
}

export default useLogin;
