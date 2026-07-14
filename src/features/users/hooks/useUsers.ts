import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import { InstitutionAdmin, ApiResponse, CreateAdminPayload, CreateStudentPayload, UpdateStudentEnrollmentPayload, ApproveEnrollmentPayload } from '../types/user.types';
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

    const updateStudentMutation = useMutation({
        mutationFn: ({ enrollmentId, payload }: { enrollmentId: string; payload: UpdateStudentEnrollmentPayload }) => 
            userService.updateStudentEnrollment(enrollmentId, payload),
        onSuccess: (data, variables) => {
            toast.success('Student enrollment updated successfully');
            
            // Manually update the query cache for immediate visual feedback
            queryClient.setQueriesData({ queryKey: ['students'] }, (oldData: any) => {
                if (!Array.isArray(oldData)) return oldData;
                return oldData.map((student: any) => {
                    if (student.id === variables.enrollmentId) {
                        const newIsActive = variables.payload.isActive !== undefined ? variables.payload.isActive : student.isActive;
                        return {
                            ...student,
                            isActive: newIsActive,
                            user: {
                                ...student.user,
                                isActive: newIsActive
                            }
                        };
                    }
                    return student;
                });
            });

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
        updateStudent: updateStudentMutation.mutateAsync,
        isUpdating: updateStudentMutation.isPending,
    };
}

export function useUnapprovedRegistrations() {
    const queryClient = useQueryClient();

    const registrationsQuery = useQuery({
        queryKey: ['unapproved-registrations'],
        queryFn: () => userService.getUnapprovedStudents(),
    });

    const approveMutation = useMutation({
        mutationFn: ({ enrollmentId, payload }: { enrollmentId: string; payload: ApproveEnrollmentPayload }) =>
            userService.approveStudentEnrollment(enrollmentId, payload),
        onSuccess: (_, variables) => {
            const message = variables.payload.isApproved
                ? 'Registration approved successfully'
                : 'Registration rejected successfully';
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ['unapproved-registrations'] });
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });

    return {
        registrations: registrationsQuery.data,
        isLoading: registrationsQuery.isLoading,
        error: registrationsQuery.error,
        refetch: registrationsQuery.refetch,
        approveRegistration: approveMutation.mutateAsync,
        isApproving: approveMutation.isPending,
    };
}
