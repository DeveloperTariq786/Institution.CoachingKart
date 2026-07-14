import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditCourseForm } from "@/features/courses/components/EditCourseForm";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { Course } from "@/features/courses/types/course";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { courses, fetchCourses, isLoading } = useCourses();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses(1, 100);
  }, [fetchCourses]);

  useEffect(() => {
    if (courses.length > 0 && courseId) {
      const found = courses.find((c) => c.id === courseId);
      if (found) {
        setCourse(found);
      } else {
        navigate(ROUTES.COURSES);
      }
    }
  }, [courses, courseId, navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Edit Course</h1>
          <p className="text-muted-foreground mt-1">
            Update the course details for your institution
          </p>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {isLoading || !course ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <EditCourseForm course={course} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditCourse;
