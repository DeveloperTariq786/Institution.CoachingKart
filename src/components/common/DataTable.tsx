import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface Column<T> {
    header: string;
    accessorKey?: string;
    className?: string;
    cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
    className?: string;
    rowClassName?: string;
}

/**
 * A reusable, generic Data Table component.
 * @param data - Array of objects to display. Objects should ideally have an 'id'.
 */
export function DataTable<T extends { id?: string | number }>({
    columns,
    data,
    isLoading,
    emptyMessage = "No data available.",
    className,
    rowClassName,
}: DataTableProps<T>) {
    return (
        <div className={cn("rounded-xl border border-border bg-card shadow-sm overflow-hidden", className)}>
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent border-b">
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className={cn(
                                    "h-12 px-4 text-left align-middle font-semibold text-foreground/80",
                                    column.className
                                )}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        // Loading State (Skeletons)
                        Array.from({ length: 5 }).map((_, rowIndex) => (
                            <TableRow key={`loading-${rowIndex}`} className="border-b last:border-0">
                                {columns.map((_, colIndex) => (
                                    <TableCell key={`col-${colIndex}`} className="p-4">
                                        <Skeleton className="h-4 w-full opacity-60" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : data.length === 0 ? (
                        // Empty State
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-32 text-center text-muted-foreground animate-fade-in"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        // Data Rows
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={row.id || rowIndex}
                                className={cn(
                                    "group transition-colors hover:bg-muted/20 border-b last:border-0",
                                    rowClassName
                                )}
                            >
                                {columns.map((column, colIndex) => (
                                    <TableCell key={colIndex} className={cn("p-4 align-middle", column.className)}>
                                        {column.cell
                                            ? column.cell(row)
                                            : (column.accessorKey ? (row as any)[column.accessorKey] : null)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
