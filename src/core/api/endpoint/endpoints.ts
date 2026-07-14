// Base API version
const API_VERSION = '/api/v1';

// Authentication Endpoints

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_VERSION}/auth/login`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,
    RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
} as const;

/**
 * User Endpoints
 */
export const USER_ENDPOINTS = {
    PROFILE: `${API_VERSION}/users/profile`,
    UPDATE_PROFILE: `${API_VERSION}/users/profile`,
    CHANGE_PASSWORD: `${API_VERSION}/users/change-password`,
} as const;

/**
 * Institution Endpoints
 */
export const INSTITUTION_ENDPOINTS = {
    LIST: `${API_VERSION}/institutions`,
    DETAILS: (id: string) => `${API_VERSION}/institutions/${id}`,
    CREATE: `${API_VERSION}/institutions`,
    ONBOARDING: `${API_VERSION}/institution/admin/institution/onboarding`,
    PROFILE_ME: `${API_VERSION}/institution/admin/institution/me`,
    UPDATE_ADMIN: `${API_VERSION}/institution/admin/institution/update`,
    ADMIN_USERS: `${API_VERSION}/institution/admin/user`,
    STUDENT_USERS: `${API_VERSION}/institution/admin/user/students`,
    STUDENT: `${API_VERSION}/institution/admin/student`,
    STUDENT_UNAPPROVED: `${API_VERSION}/institution/admin/student/unapproved`,
    STUDENT_ENROLLMENT: `${API_VERSION}/institution/admin/student/enrollment`,
    STUDENT_ENROLLMENT_APPROVE: `${API_VERSION}/institution/admin/student/enrollment/approve`,
    UPDATE: (id: string) => `${API_VERSION}/institutions/${id}`,
    DELETE: (id: string) => `${API_VERSION}/institutions/${id}`,
    COURSES: `${API_VERSION}/institution/admin/course`,
    PROGRAMS: `${API_VERSION}/institution/admin/program`,
    BATCHES: `${API_VERSION}/institution/admin/batch`,
    SUBJECTS: `${API_VERSION}/institution/admin/subject`,
    FACULTY: `${API_VERSION}/institution/admin/faculty`,
    LECTURES: `${API_VERSION}/institution/admin/lecture`,
    CENTERS: `${API_VERSION}/institution/admin/center`,
    CENTERS_UPDATE: `${API_VERSION}/institution/admin/center/update`,
    CENTERS_DELETE: `${API_VERSION}/institution/admin/center/delete`,
    RESULTS: `${API_VERSION}/institution/admin/result`,
    RESULTS_UPDATE: `${API_VERSION}/institution/admin/result/update`,
    RESULTS_DELETE: `${API_VERSION}/institution/admin/result/delete`,
    GALLERY: `${API_VERSION}/institution/admin/gallery`,
    GALLERY_UPDATE: `${API_VERSION}/institution/admin/gallery/update`,
    GALLERY_DELETE: `${API_VERSION}/institution/admin/gallery/delete`,
    BANNER: `${API_VERSION}/institution/admin/banner`,
    BANNER_UPDATE: `${API_VERSION}/institution/admin/banner/update`,
    BANNER_DELETE: `${API_VERSION}/institution/admin/banner/delete`,
    ABOUT: `${API_VERSION}/institution/admin/about`,
    RESOURCES: `${API_VERSION}/institution/admin/resource`,
    DASHBOARD_STATS: `${API_VERSION}/institution/admin/dashboard/stats`,
    RECENT_LECTURES: `${API_VERSION}/institution/admin/dashboard/recent-lectures`,
    INSTITUTION_THEME: `${API_VERSION}/institution/admin/institutionthemes`,
    THEME: `${API_VERSION}/institution/admin/theme`,
} as const;

/**
 * All endpoints combined
 */
export const ENDPOINTS = {
    AUTH: AUTH_ENDPOINTS,
    USER: USER_ENDPOINTS,
    INSTITUTION: INSTITUTION_ENDPOINTS,
} as const;

export default ENDPOINTS;
