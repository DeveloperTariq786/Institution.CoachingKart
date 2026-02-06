
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Heart, Stethoscope, BookOpen, GraduationCap, Code, Atom } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { DataTable, Column } from "@/components/common/DataTable";

const sampleCourses = [
  {
    id: 1,
    name: "NEET",
    icon: Heart,
    programs: ["Class 11", "Class 12", "Dropper"],
    color: "bg-rose-50",
    iconColor: "text-rose-500"
  },
  {
    id: 2,
    name: "IIT JEE",
    icon: Stethoscope,
    programs: ["Class 11", "Class 12", "Dropper"],
    color: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  {
    id: 3,
    name: "Pre Foundation",
    icon: BookOpen,
    programs: ["Class 8", "Class 9", "Class 10"],
    color: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    id: 4,
    name: "Board Exams",
    icon: GraduationCap,
    programs: ["Class 10", "Class 12"],
    color: "bg-green-50",
    iconColor: "text-green-500"
  },
  {
    id: 5,
    name: "Programming",
    icon: Code,
    programs: ["Beginner", "Intermediate", "Advanced"],
    color: "bg-purple-50",
    iconColor: "text-purple-500"
  },
  {
    id: 6,
    name: "Science Olympiad",
    icon: Atom,
    programs: ["Class 6-8", "Class 9-10", "Class 11-12"],
    color: "bg-cyan-50",
    iconColor: "text-cyan-500"
  },
];

type Course = typeof sampleCourses[0];

const Courses = () => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{ id: number, name: string } | null>(null);

  const handleDelete = (courseName: string) => {
    toast({
      title: "Course Deleted",
      description: `"${courseName}" has been deleted.`,
    });
  };

  const handleDeleteClick = (course: { id: number, name: string }) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      handleDelete(courseToDelete.name);
      setCourseToDelete(null);
    }
  };

  const columns: Column<Course>[] = [
    {
      header: "Name",
      className: "w-[300px]",
      cell: (course) => (
        <div className="flex items-center gap-3">
          <div className={`${course.color} p-2 rounded-full`}>
            <course.icon className={`h-5 w-5 ${course.iconColor}`} />
          </div>
          <span className="font-medium">{course.name}</span>
        </div>
      ),
    },
    {
      header: "Programs",
      cell: (course) => (
        <span className="text-muted-foreground">
          {course.programs.join(", ")}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right w-[150px]",
      cell: (course) => (
        <div className="flex justify-end gap-2 text-right">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
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
            <h1 className="text-2xl font-bold text-foreground">Manage Courses</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all courses offered by your institution.
            </p>
          </div>
          <Button asChild>
            <Link to={ROUTES.COURSES_ADD}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Link>
          </Button>
        </div>

        {/* Courses Table */}
        <DataTable columns={columns} data={sampleCourses} />
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
