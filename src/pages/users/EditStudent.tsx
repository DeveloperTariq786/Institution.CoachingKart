import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditStudentForm } from "@/features/users/components/EditStudentForm";
import { useStudents } from "@/features/users/hooks/useUsers";
import { InstitutionStudent } from "@/features/users/types/user.types";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditStudent = () => {
    const { enrollmentId } = useParams<{ enrollmentId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { students } = useStudents();
    const [student, setStudent] = useState<InstitutionStudent | null>(null);

    useEffect(() => {
        if (location.state?.student) {
            setStudent(location.state.student);
            return;
        }

        if (students && students.length > 0 && enrollmentId) {
            const found = students.find((s) => s.id === enrollmentId);
            if (found) {
                setStudent(found);
            } else {
                navigate(ROUTES.STUDENTS);
            }
        } else if (enrollmentId) {
            navigate(ROUTES.STUDENTS);
        }
    }, [students, enrollmentId, navigate, location.state]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Edit Student Enrollment</h1>
                    <p className="text-muted-foreground mt-1">
                        Update the student's name, email, phone, batch, or fee information
                    </p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {!student ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <EditStudentForm student={student} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditStudent;
