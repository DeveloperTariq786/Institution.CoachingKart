/**
 * Auth Service
 * API service for authentication endpoints
 */

import { apiClient } from '@/core/api';
import { AUTH_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { LoginRequest, LoginResponse } from '@/features/login/types';

/**
 * Login API call
 * @param credentials - Email and password
 * @returns Login response with user data and token
 */
export async function loginApi(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
}

/**
 * Logout API call (if backend requires it)
 */
export async function logoutApi(): Promise<void> {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
}

export const authService = {
    login: loginApi,
    logout: logoutApi,
};

export default authService;
