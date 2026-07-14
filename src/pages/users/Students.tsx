import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";
import { useStudents } from "@/features/users/hooks/useUsers";
import { StudentsTable } from "@/features/users/components/StudentsTable";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";

const Students = () => {
  const { students, isLoading, refetch } = useStudents();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground mt-1">
              View and manage Enrolled Students
            </p>
          </div>
          <Button onClick={() => navigate(ROUTES.STUDENTS_ADD)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <StudentsTable students={students || []} isLoading={isLoading} refetch={refetch} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Students;
