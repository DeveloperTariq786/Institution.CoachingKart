import { useState } from 'react';
import { DataTable, Column } from '@/components/common/DataTable';
import { ApproveEnrollmentPayload, InstitutionStudent } from '../types/user.types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApproveRegistrationDialog } from './ApproveRegistrationDialog';
import { DeleteConfirmDialog } from '@/components/common/DeleteConfirmDialog';

interface NewRegistrationsTableProps {
    registrations: InstitutionStudent[];
    isLoading: boolean;
    onApprove: (enrollmentId: string, payload: ApproveEnrollmentPayload) => Promise<void>;
    isApproving: boolean;
}

export function NewRegistrationsTable({ registrations, isLoading, onApprove, isApproving }: NewRegistrationsTableProps) {
    const [selectedRegistration, setSelectedRegistration] = useState<InstitutionStudent | null>(null);
    const [approveDialogOpen, setApproveDialogOpen] = useState(false);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

    const handleApprove = async ({ setExpiry, expiresAt }: { setExpiry: boolean; expiresAt?: string }) => {
        if (!selectedRegistration) return;

        await onApprove(
            selectedRegistration.id,
            setExpiry && expiresAt
                ? { isApproved: true, expiresAt }
                : { isApproved: true },
        );

        setApproveDialogOpen(false);
        setSelectedRegistration(null);
    };

    const handleReject = async () => {
        if (!selectedRegistration) return;

        await onApprove(selectedRegistration.id, { isApproved: false });

        setRejectDialogOpen(false);
        setSelectedRegistration(null);
    };

    const columns: Column<InstitutionStudent>[] = [
        {
            header: 'Name',
            cell: (item) => (
                <div className="font-medium text-foreground">
                    {item.user.name}
                </div>
            ),
        },
        {
            header: 'Email',
            cell: (item) => (
                <div className="text-muted-foreground">
                    {item.user.email}
                </div>
            ),
        },
        {
            header: 'Batch',
            cell: (item) => (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-700">{item.batch.name}</span>
                    <span className="text-[10px] text-slate-400 capitalize">{item.batch.session} Session</span>
                </div>
            ),
        },
        {
            header: 'Program',
            cell: (item) => (
                <div className="font-medium text-slate-700">
                    {item.batch.program.name}
                </div>
            ),
        },
        {
            header: 'Course',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    {item.batch.program.course.icon && (
                        <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", item.batch.program.course.color)}>
                            <img
                                src={item.batch.program.course.icon}
                                alt={item.batch.program.course.name}
                                className="w-4 h-4 object-contain brightness-0 invert"
                            />
                        </div>
                    )}
                    <span className="font-medium text-foreground">
                        {item.batch.program.course.name}
                    </span>
                </div>
            ),
        },
        {
            header: 'Joined At',
            cell: (item) => (
                <div className="text-muted-foreground">
                    {format(new Date(item.joinedAt), 'dd MMM yyyy')}
                </div>
            ),
        },
        {
            header: 'Status',
            cell: () => (
                <span className="text-xs font-semibold px-2 py-1 rounded-full uppercase bg-amber-100 text-amber-700">
                    Pending Approval
                </span>
            ),
        },
        {
            header: 'Actions',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => {
                            setSelectedRegistration(item);
                            setApproveDialogOpen(true);
                        }}
                    >
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                        Approve
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-destructive border-destructive/30 hover:bg-destructive/5"
                        onClick={() => {
                            setSelectedRegistration(item);
                            setRejectDialogOpen(true);
                        }}
                    >
                        <XCircle className="h-3.5 w-3.5 mr-1.5" />
                        Reject
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={registrations}
                isLoading={isLoading}
                emptyMessage="No new registrations found."
            />

            <ApproveRegistrationDialog
                open={approveDialogOpen}
                onOpenChange={setApproveDialogOpen}
                registration={selectedRegistration}
                onApprove={handleApprove}
                isLoading={isApproving}
            />

            <DeleteConfirmDialog
                open={rejectDialogOpen}
                onOpenChange={setRejectDialogOpen}
                onConfirm={handleReject}
                title="Reject Registration"
                description={
                    selectedRegistration
                        ? `Are you sure you want to reject ${selectedRegistration.user.name}'s enrollment in ${selectedRegistration.batch.name}? This will remove the pending registration.`
                        : undefined
                }
                confirmLabel="Reject"
                isLoading={isApproving}
            />
        </>
    );
}
