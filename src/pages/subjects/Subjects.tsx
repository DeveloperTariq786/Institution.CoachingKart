import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { DataTable, Column } from "@/components/common/DataTable";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { Subject } from "@/features/subjects/types/subject";
import { SubjectRowInfo } from "@/features/subjects/components/SubjectRowInfo";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Subjects = () => {
    const { subjects, pagination, isLoading, fetchSubjects, deleteSubject, hasLoaded } = useSubjects();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchSubjects(currentPage, 10);
    }, [fetchSubjects, currentPage]);

    const handleDeleteClick = (subject: Subject) => {
        setSubjectToDelete(subject);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (subjectToDelete) {
            setIsDeleting(true);
            await deleteSubject(subjectToDelete.id);
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setSubjectToDelete(null);
        }
    };

    const columns: Column<Subject>[] = [
        {
            header: "Subject Name",
            className: "w-[300px]",
            cell: (subject) => (
                <SubjectRowInfo name={subject.name} icon={subject.icon} />
            ),
        },

        {
            header: "Actions",
            className: "text-right w-[150px]",
            cell: (subject) => (
                <div className="flex justify-end gap-2 text-right">
                    <Link to={ROUTES.SUBJECTS_EDIT.replace(":subjectId", subject.id)}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
                            <Pencil className="h-4 w-4 text-slate-500" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(subject)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Manage Subjects</h1>
                        <p className="text-slate-500 mt-1">
                            Define and manage academic subjects.
                        </p>
                    </div>
                    <Button asChild className="shadow-sm">
                        <Link to={ROUTES.SUBJECTS_ADD}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Subject
                        </Link>
                    </Button>
                </div>

                {/* Subjects Table */}
                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0">
                        <DataTable
                            columns={columns}
                            data={subjects}
                            isLoading={isLoading || !hasLoaded}
                        />

                        {pagination && pagination.pages > 1 && (
                            <div className="p-4 border-t border-border">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                                }}
                                                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                            />
                                        </PaginationItem>

                                        <div className="flex items-center justify-center text-sm font-medium mx-4">
                                            Page {currentPage} of {pagination.pages}
                                        </div>

                                        <PaginationItem>
                                            <PaginationNext
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (currentPage < pagination.pages) setCurrentPage(currentPage + 1);
                                                }}
                                                className={currentPage >= pagination.pages ? "pointer-events-none opacity-50" : ""}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
                title="Delete Subject"
                itemName={subjectToDelete?.name}
                isLoading={isDeleting}
            />
        </DashboardLayout>
    );
};

export default Subjects;
