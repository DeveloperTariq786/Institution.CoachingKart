/**
 * useResetPassword Hook
 * React Query mutation hook for reset password functionality
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { showErrorToast } from '@/core/errors';
import { authService } from '@/features/login/services/auth.service';
import { ResetPasswordRequest, ResetPasswordResponse } from '@/features/login/types';
import { ROUTES } from '@/core/routes/paths';

/**
 * Reset password mutation hook
 */
export function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: ResetPasswordRequest) => authService.resetPassword(payload),
        onSuccess: (response: ResetPasswordResponse) => {
            toast.success(response.message || 'Password reset successfully');
            navigate(ROUTES.LOGIN);
        },
        onError: (error: unknown) => {
            showErrorToast(error);
        },
    });
}

export default useResetPassword;
