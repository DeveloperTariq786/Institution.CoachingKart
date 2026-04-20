import { DataTable, Column } from '@/components/common/DataTable';
import { InstitutionStudent } from '../types/user.types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface StudentsTableProps {
    students: InstitutionStudent[];
    isLoading: boolean;
}

export function StudentsTable({ students, isLoading }: StudentsTableProps) {
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
            header: 'Joined Date',
            cell: (item) => (
                <div className="text-muted-foreground">
                    {format(new Date(item.joinedAt), 'dd MMM yyyy')}
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
