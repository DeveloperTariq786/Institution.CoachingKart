import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditFacultyForm } from "@/features/faculty/components/EditFacultyForm";
import { useFaculty } from "@/features/faculty/hooks/useFaculty";
import { Faculty } from "@/features/faculty/types/faculty";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditFaculty = () => {
    const { facultyId } = useParams<{ facultyId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { faculty: facultyList, fetchFaculty, hasLoaded } = useFaculty();
    const [faculty, setFaculty] = useState<Faculty | null>(null);

    useEffect(() => {
        if (location.state?.faculty) {
            setFaculty(location.state.faculty);
            return;
        }

        if (facultyList && facultyList.length > 0 && facultyId) {
            const found = facultyList.find((f) => f.id === facultyId);
            if (found) {
                setFaculty(found);
            } else {
                navigate(ROUTES.FACULTY);
            }
        } else if (facultyId && !hasLoaded) {
            fetchFaculty();
        } else if (facultyId) {
            navigate(ROUTES.FACULTY);
        }
    }, [facultyList, facultyId, navigate, location.state, fetchFaculty, hasLoaded]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Edit Faculty</h1>
                    <p className="text-muted-foreground mt-1">
                        Update the faculty member's name, experience, tag, subject, or bio
                    </p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {!faculty ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <EditFacultyForm faculty={faculty} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditFaculty;
