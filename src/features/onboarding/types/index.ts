/**
 * Onboarding Types
 */

export interface OnboardingLocation {
    address: string;
    city: string;
    country: string;
}

export interface OnboardingRequest {
    institutionName: string;
    ownerName: string;
    ownerEmail: string;
    ownerPassword?: string;
    logo?: string;
    coverImage?: string;
    description?: string;
    location: OnboardingLocation;
    tuitionEmail: string;
    tuitionPhone: string;
}

export interface OnboardingResponse {
    success: boolean;
    message: string;
}
