import { DataTable, Column } from "@/components/common/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Result } from "../types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ResultsTableProps {
    results: Result[];
    isLoading: boolean;
    onEdit: (result: Result) => void;
    onDelete: (result: Result) => void;
}

const ResultsTable = ({ results, isLoading, onEdit, onDelete }: ResultsTableProps) => {
    const columns: Column<Result>[] = [
        {
            header: "Student",
            cell: (result) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={result.profile} alt={result.studentName} />
                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                            {result.studentName?.charAt(0) || "S"}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{result.studentName}</span>
                </div>
            ),
        },
        {
            header: "Rank",
            cell: (result) => (
                <span className="inline-flex items-center rounded-md bg-primary/5 px-2 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/10">
                    {result.rank}
                </span>
            ),
        },
        {
            header: "Score",
            accessorKey: "score",
            className: "font-medium",
        },
        {
            header: "Session",
            accessorKey: "session",
        },
        {
            header: "Course",
            accessorKey: "courseName",
        },
        {
            header: "Batch",
            accessorKey: "batchName",
        },
        {
            header: "Added On",
            cell: (result) => (
                <span className="text-muted-foreground tabular-nums">
                    {result.createdAt ? format(new Date(result.createdAt), "MMM dd, yyyy") : "N/A"}
                </span>
            ),
        },
        {
            header: "Actions",
            className: "text-right w-[120px]",
            cell: (result) => (
                <div className="flex justify-end gap-1.5 text-right">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        type="button"
                        className="h-8 w-8 hover:bg-slate-100"
                        onClick={() => onEdit(result)}
                    >
                        <Pencil className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(result)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={results}
            isLoading={isLoading}
            emptyMessage="No student results found."
        />
    );
};

export default ResultsTable;
