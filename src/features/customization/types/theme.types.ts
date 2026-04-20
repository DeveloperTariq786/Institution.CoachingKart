
export interface InstitutionTheme {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
}

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
