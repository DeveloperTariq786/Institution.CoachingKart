export interface GalleryImage {
    id: string;
    image: string;
    tag: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryResponse {
    success: boolean;
    data: GalleryImage[];
}

export interface CreateGalleryRequest {
    items: { tag: string; file: File }[];
}

// Banner Types
export interface BannerImage {
    id: string;
    image: string;
    heading: string;
    description: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface BannerResponse {
    success: boolean;
    data: BannerImage[];
}

export interface CreateBannerRequest {
    items: { heading: string; description: string; file: File }[];
}

// About Types
export interface AboutData {
    id: string;
    title: string;
    description: string;
    image: string;
    visionTitle: string;
    visionContent: string;
    missionTitle: string;
    missionContent: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface AboutResponse {
    success: boolean;
    data: AboutData;
}

export interface UpdateAboutRequest {
    title: string;
    description: string;
    image: string | File;
    visionTitle: string;
    visionContent: string;
    missionTitle: string;
    missionContent: string;
}
