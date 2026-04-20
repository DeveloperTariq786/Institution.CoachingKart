import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { AddCourseForm } from "@/features/courses/components/AddCourseForm";

const AddCourse = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Add New Course</h1>
          <p className="text-muted-foreground mt-1">
            Create a new course for your institution
          </p>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <AddCourseForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddCourse;
