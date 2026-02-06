export interface Location {
    address: string;
    city: string;
}

export interface InstitutionProfileResponse {
    id: string;
    name: string;
    status: string;
    logo: string;
    coverImage: string;
    description: string;
    location: Location;
    tuitionEmail: string;
    tuitionPhone: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        members: number;
    };
}

export interface InstitutionProfile {
    id: string;
    institutionName: string;
    description: string;
    logo: string | File;
    coverimage: string | File;
    location: Location;
    tuitionEmail: string;
    tuitionPhone: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
