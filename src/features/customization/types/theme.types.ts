
export interface InstitutionTheme {
    primary: string;
    background: string;
    foreground: string;
}

export interface InstitutionThemeResponse extends InstitutionTheme {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ColorPalette extends InstitutionTheme {
    id: string;
    name: string;
}

export const PREDEFINED_PALETTES: ColorPalette[] = [
   
];

export interface InstitutionThemeResponse extends InstitutionTheme {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
