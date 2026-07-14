import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditProgramForm } from "@/features/programs/components/EditProgramForm";
import { usePrograms } from "@/features/programs/hooks/usePrograms";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { Program } from "@/features/programs/types/program";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditProgram = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const { courses, fetchCourses } = useCourses();
  const { programs, fetchPrograms, isLoading } = usePrograms();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (courses.length > 0) {
      fetchPrograms({ institutionId: courses[0].institutionId }, 1, 100);
    }
  }, [courses, fetchPrograms]);

  useEffect(() => {
    if (programs.length > 0 && programId) {
      const found = programs.find((p) => p.id === programId);
      if (found) {
        setProgram(found);
      } else {
        // If not found in current list, try fetching without filters or navigate back
        navigate(ROUTES.PROGRAMS);
      }
    }
  }, [programs, programId, navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Edit Program</h1>
          <p className="text-muted-foreground mt-1">
            Update the program details under a specific course
          </p>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {isLoading || !program ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <EditProgramForm program={program} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditProgram;
