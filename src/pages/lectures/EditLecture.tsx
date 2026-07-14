import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditLectureForm } from "@/features/lectures/components/EditLectureForm";
import { useLectures } from "@/features/lectures/hooks/useLectures";
import { Lecture } from "@/features/lectures/types/lecture";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditLecture = () => {
    const { lectureId } = useParams<{ lectureId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { lectures } = useLectures();
    const [lecture, setLecture] = useState<Lecture | null>(null);

    useEffect(() => {
        // Try finding lecture from location state first (very reliable since it's passed from list)
        if (location.state?.lecture) {
            setLecture(location.state.lecture);
            return;
        }

        // Fallback to store if state is lost
        if (lectures.length > 0 && lectureId) {
            const found = lectures.find((l) => l.id === lectureId);
            if (found) {
                setLecture(found);
            } else {
                navigate(ROUTES.LECTURES);
            }
        } else if (lectureId) {
            // If neither works, navigate back
            navigate(ROUTES.LECTURES);
        }
    }, [lectures, lectureId, navigate, location.state]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Edit Lecture</h1>
                    <p className="text-muted-foreground mt-1">
                        Update the lecture title, faculty member, or thumbnail
                    </p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {!lecture ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <EditLectureForm lecture={lecture} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditLecture;
