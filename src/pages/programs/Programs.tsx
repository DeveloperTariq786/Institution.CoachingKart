import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { DataTable, Column } from "@/components/common/DataTable";
import { usePrograms } from "@/features/programs/hooks/usePrograms";
import { Program } from "@/features/programs/types/program";
import { ProgramRowInfo } from "@/features/programs/components/ProgramRowInfo";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Programs = () => {
  const { programs, pagination, isLoading, fetchPrograms, deleteProgram, hasLoaded } = usePrograms();
  const { courses, fetchCourses } = useCourses();
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId("all");
    }
  }, [courses, selectedCourseId]);

  useEffect(() => {
    if (selectedCourseId === "all") {
      if (courses.length > 0) {
        fetchPrograms({ institutionId: courses[0].institutionId }, currentPage, 10);
      }
    } else if (selectedCourseId) {
      fetchPrograms({ courseId: selectedCourseId }, currentPage, 10);
    }
  }, [fetchPrograms, selectedCourseId, courses, currentPage]);

  const handleDeleteClick = (program: Program) => {
    setProgramToDelete(program);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (programToDelete) {
      await deleteProgram(programToDelete.id);
      setProgramToDelete(null);
    }
  };

  const columns: Column<Program>[] = [
    {
      header: "Name",
      className: "w-[300px]",
      cell: (program) => (
        <ProgramRowInfo
          name={program.name}
        // courseName={program.course?.name} // If the API returns full course object, use it. The response example has `course: { name: ... }`.
        />
      ),
    },
    {
      header: "Course",
      cell: (program) => (
        <span className="font-medium text-slate-700">
          {program.course?.name || "Unknown Course"}
        </span>
      ),
    },
    {
      header: "Created At",
      cell: (program) => (
        <span className="text-muted-foreground">
          {new Date(program.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right w-[150px]",
      cell: (program) => (
        <div className="flex justify-end gap-2 text-right">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
            <Pencil className="h-4 w-4 text-slate-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleDeleteClick(program)}
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
            <h1 className="text-2xl font-bold text-slate-900">Manage Programs</h1>
            <p className="text-slate-500 mt-1">
              View and manage programs across your courses.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[200px]">
              <Select
                value={selectedCourseId}
                onValueChange={setSelectedCourseId}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button asChild className="shadow-sm">
              <Link to={ROUTES.PROGRAMS_ADD}>
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Link>
            </Button>
          </div>
        </div>

        {/* Programs Table */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={programs}
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
        title="Delete Program"
        itemName={programToDelete?.name}
      />
    </DashboardLayout >
  );
};

export default Programs;
