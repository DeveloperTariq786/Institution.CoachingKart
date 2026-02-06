import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import { InstitutionAdmin, ApiResponse, CreateAdminPayload, CreateStudentPayload } from '../types/user.types';
import { toast } from 'sonner';
import { showErrorToast } from '@/core/errors';

export function useAdmins(page = 1, limit = 10) {
    const queryClient = useQueryClient();

    const adminsQuery = useQuery({
        queryKey: ['admins', page, limit],
        queryFn: () => userService.getAdmins(page, limit),
    });

    const createAdminMutation = useMutation({
        mutationFn: (payload: CreateAdminPayload) => userService.createAdmin(payload),
        onSuccess: () => {
            toast.success('Administrator created successfully');
            queryClient.invalidateQueries({ queryKey: ['admins'] });
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });

    return {
        admins: adminsQuery.data,
        isLoading: adminsQuery.isLoading,
        error: adminsQuery.error,
        refetch: adminsQuery.refetch,
        createAdmin: createAdminMutation.mutateAsync,
        isCreating: createAdminMutation.isPending,
    };
}

export function useStudents(page = 1, limit = 10) {
    const queryClient = useQueryClient();

    const studentsQuery = useQuery({
        queryKey: ['students', page, limit],
        queryFn: () => userService.getStudents(page, limit),
    });

    const createStudentMutation = useMutation({
        mutationFn: (payload: CreateStudentPayload) => userService.createStudent(payload),
        onSuccess: () => {
            toast.success('Student created successfully');
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });

    return {
        students: studentsQuery.data,
        isLoading: studentsQuery.isLoading,
        error: studentsQuery.error,
        refetch: studentsQuery.refetch,
        createStudent: createStudentMutation.mutateAsync,
        isCreating: createStudentMutation.isPending,
    };
}
