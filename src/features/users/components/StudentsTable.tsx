import { DataTable, Column } from '@/components/common/DataTable';
import { InstitutionStudent } from '../types/user.types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/core/routes/paths';
import { Pencil } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useStudents } from '../hooks/useUsers';
import { useState } from 'react';

interface StudentsTableProps {
    students: InstitutionStudent[];
    isLoading: boolean;
    refetch: () => void;
}

export function StudentsTable({ students, isLoading, refetch }: StudentsTableProps) {
    const navigate = useNavigate();
    const { updateStudent } = useStudents();
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const handleStatusToggle = async (studentId: string, currentIsActive: boolean) => {
        setTogglingId(studentId);
        try {
            await updateStudent({
                enrollmentId: studentId,
                payload: { isActive: !currentIsActive },
            });
            // Force reload the table/data to make sure it is 100% synced with DB status
            refetch();
        } catch (error) {
            // Error handled by hook
        } finally {
            setTogglingId(null);
        }
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
            header: 'Expires At',
            cell: (item) => {
                if (!item.expiresAt) {
                    return (
                        <span className="text-xs font-semibold text-destructive uppercase">Expired</span>
                    );
                }

                const expiry = new Date(item.expiresAt);
                const isExpired = expiry <= new Date();

                if (isExpired) {
                    return (
                        <span className="text-xs font-semibold text-destructive uppercase">Expired</span>
                    );
                }

                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                            {format(expiry, 'dd MMM yyyy')}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            {format(expiry, 'h:mm a')}
                        </span>
                    </div>
                );
            },
        },
        {
            header: 'IsActive',
            cell: (item) => {
                const isActive = item.isActive !== undefined ? item.isActive : item.user.isActive;
                return (
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={isActive}
                            disabled={togglingId === item.id}
                            onCheckedChange={() => handleStatusToggle(item.id, isActive)}
                        />
                        
                    </div>
                );
            },
        },
        {
            header: 'Actions',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(ROUTES.STUDENTS_EDIT.replace(':enrollmentId', item.id), { state: { student: item } })}
                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                        title="Edit Student"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={students}
            isLoading={isLoading}
            emptyMessage="No students found."
        />
    );
}
