import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ResourceList } from "@/features/resources/components/ResourceList";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/core/routes/paths";

const LectureResources = () => {
    const { lectureId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine the return path. If we have it in state, use it.
    const backPath = location.state?.from || ROUTES.LECTURES;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                        onClick={() => navigate(backPath)}
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Lecture Resources</h1>
                        <p className="text-slate-500 mt-1">Manage learning materials for this lecture</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
                    <ResourceList lectureId={lectureId || ""} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default LectureResources;
