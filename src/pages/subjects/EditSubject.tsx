import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditSubjectForm } from "@/features/subjects/components/EditSubjectForm";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { Subject } from "@/features/subjects/types/subject";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditSubject = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { subjects, fetchSubjects, isLoading } = useSubjects();
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    fetchSubjects(1, 100);
  }, [fetchSubjects]);

  useEffect(() => {
    if (subjects.length > 0 && subjectId) {
      const found = subjects.find((s) => s.id === subjectId);
      if (found) {
        setSubject(found);
      } else {
        navigate(ROUTES.SUBJECTS);
      }
    }
  }, [subjects, subjectId, navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Edit Subject</h1>
          <p className="text-muted-foreground mt-1">
            Update the subject details for your institution
          </p>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {isLoading || !subject ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <EditSubjectForm subject={subject} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditSubject;
