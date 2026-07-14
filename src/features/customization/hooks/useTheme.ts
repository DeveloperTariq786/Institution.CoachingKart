
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import themeService from '../services/theme.service';
import { InstitutionTheme } from '../types/theme.types';
import { toast } from 'sonner';

export const useTheme = () => {
    const queryClient = useQueryClient();

    const { data: themes, isLoading: isThemesLoading } = useQuery({
        queryKey: ['institution-themes'],
        queryFn: themeService.getThemes,
    });

    const { data: activeTheme, isLoading: isActiveThemeLoading } = useQuery({
        queryKey: ['institution-active-theme'],
        queryFn: themeService.getActiveTheme,
    });

    const updateThemeMutation = useMutation({
        mutationFn: (newTheme: InstitutionTheme) => themeService.updateTheme(newTheme),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['institution-themes'] });
            queryClient.invalidateQueries({ queryKey: ['institution-active-theme'] });
            toast.success('Theme updated successfully');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to update theme');
        }
    });

    return {
        themes: themes || [],
        activeTheme,
        isLoading: isThemesLoading || isActiveThemeLoading,
        updateTheme: updateThemeMutation.mutate,
        isUpdating: updateThemeMutation.isPending,
    };
};
