import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { DataTable, Column } from "@/components/common/DataTable";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { Course } from "@/features/courses/types/course";
import { CourseRowInfo } from "@/features/courses/components/CourseRowInfo";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Courses = () => {
  const { courses, pagination, isLoading, fetchCourses, deleteCourse } = useCourses();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCourses(currentPage, 10);
  }, [fetchCourses, currentPage]);

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (courseToDelete) {
      await deleteCourse(courseToDelete.id);
      setCourseToDelete(null);
    }
  };

  const columns: Column<Course>[] = [
    {
      header: "Name",
      className: "w-[300px]",
      cell: (course) => (
        <CourseRowInfo
          name={course.name}
          icon={course.icon}
          color={course.color}
        />
      ),
    },
    {
      header: "Created At",
      cell: (course) => (
        <span className="text-muted-foreground">
          {new Date(course.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right w-[150px]",
      cell: (course) => (
        <div className="flex justify-end gap-2 text-right">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
            <Pencil className="h-4 w-4 text-slate-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleDeleteClick(course)}
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Courses</h1>
            <p className="text-slate-500 mt-1">
              View and manage all courses offered by your institution.
            </p>
          </div>
          <Button asChild className="shadow-sm">
            <Link to={ROUTES.COURSES_ADD}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Link>
          </Button>
        </div>

        {/* Courses Table */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={courses}
              isLoading={isLoading}
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
        title="Delete Course"
        itemName={courseToDelete?.name}
      />
    </DashboardLayout>
  );
};

export default Courses;
