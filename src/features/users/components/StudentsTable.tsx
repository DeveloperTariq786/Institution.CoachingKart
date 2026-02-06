import { DataTable, Column } from '@/components/common/DataTable';
import { InstitutionStudent } from '../types/user.types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

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
            header: 'Role',
            cell: (item) => (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                    {item.role}
                </Badge>
            ),
        },
        {
            header: 'Status',
            cell: (item) => (
                <Badge variant={item.user.isActive ? 'default' : 'secondary'} className={item.user.isActive ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10' : ''}>
                    {item.user.isActive ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            header: 'Joined Date',
            cell: (item) => (
                <div className="text-muted-foreground">
                    {format(new Date(item.createdAt), 'dd MMM yyyy')}
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
