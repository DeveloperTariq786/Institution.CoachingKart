
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import themeService from '../services/theme.service';
import { InstitutionTheme } from '../types/theme.types';
import { toast } from 'sonner';

export const useTheme = () => {
    const queryClient = useQueryClient();

    const { data: theme, isLoading, error } = useQuery({
        queryKey: ['institution-theme'],
        queryFn: themeService.getTheme,
    });

    const updateThemeMutation = useMutation({
        mutationFn: (newTheme: InstitutionTheme) => themeService.updateTheme(newTheme),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['institution-theme'] });
            toast.success('Theme updated successfully');
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to update theme');
        }
    });

    return {
        theme,
        isLoading,
        error,
        updateTheme: updateThemeMutation.mutate,
        isUpdating: updateThemeMutation.isPending,
    };
};
