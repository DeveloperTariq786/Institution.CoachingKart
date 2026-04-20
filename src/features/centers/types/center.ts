export interface Location {
    id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
}

export interface Center {
    id: string;
    name: string;
    image: string;
    phone: string;
    institutionId: string;
    locationId: string | null;
    createdAt: string;
    updatedAt: string;
    location: Location | null;
}

export interface CreateCenterRequest {
    name: string;
    image: File;
    phone: string;
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        latitude: number;
        longitude: number;
    };
}

export interface CenterResponse {
    success: boolean;
    data: Center[];
}
