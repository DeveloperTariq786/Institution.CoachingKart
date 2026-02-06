/**
 * Auth Types
 * Type definitions for authentication and user data
 */

/**
 * User roles in the platform
 */
export type UserRole =
    | 'PLATFORM_SUPER_ADMIN'
    | 'PLATFORM_ADMIN'
    | 'INSTITUTION_OWNER'
    | 'INSTITUTION_SUPER_ADMIN'
    | 'INSTITUTION_ADMIN'
    | 'TEACHER'
    | 'STUDENT';

/**
 * Context for authentication (platform-wide or institution-specific)
 */
export type AuthContext = 'PLATFORM' | 'INSTITUTION';

/**
 * Authenticated user data from API
 */
export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

/**
 * Institution info returned during login
 */
export interface AuthInstitution {
    id: string;
    name: string;
}

/**
 * Data returned from a successful login attempt
 */
export interface LoginResponseData {
    user: AuthUser;
    context: AuthContext;
    token: string;
    refreshToken?: string;
    platformRole?: UserRole;
    institutionRole?: UserRole;
    institution?: AuthInstitution;
}

/**
 * Authentication state
 */
export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    refreshToken: string | null;
    context: AuthContext | null;
    role: UserRole | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
