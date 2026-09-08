/**
 * Login Types
 * Request and response types for authentication endpoints
 */

import { AuthUser, AuthContext, LoginResponseData } from '@/features/auth/types';

/**
 * Login request payload
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Re-exporting LoginResponseData for backward compatibility if needed, 
 * but it's now primarily in auth types.
 */

/**
 * API Response wrapper for login
 */
export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginResponseData;
}

/**
 * Login form values
 */
export interface LoginFormValues {
    email: string;
    password: string;
}

/**
 * Reset password request payload
 */
export interface ResetPasswordRequest {
    email: string;
    newPassword: string;
}

/**
 * API Response wrapper for reset password
 */
export interface ResetPasswordResponse {
    success: boolean;
    message: string;
}
