import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { institutionService } from '../services/institution.service';
import { InstitutionProfile } from '../types/institution.types';
import { showErrorToast } from '@/core/errors';

export function useInstitutionProfile() {
    const queryClient = useQueryClient();

    const profileQuery = useQuery({
        queryKey: ['institution-profile'],
        queryFn: institutionService.getProfile,
    });

    const updateMutation = useMutation({
        mutationFn: (data: InstitutionProfile) => institutionService.updateProfile(data),
        onSuccess: (data: any) => {
            toast.success(data?.message || 'Institution profile updated successfully');
            queryClient.invalidateQueries({ queryKey: ['institution-profile'] });
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });

    return {
        profile: profileQuery.data,
        isLoading: profileQuery.isLoading,
        isUpdating: updateMutation.isPending,
        updateProfile: updateMutation.mutate,
    };
}
