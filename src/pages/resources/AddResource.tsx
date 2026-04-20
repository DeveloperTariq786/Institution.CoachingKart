import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AddResourceForm } from "@/features/resources/components/AddResourceForm";

const AddResource = () => {
    const { lectureId } = useParams();
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Add Resources</h1>
                        <p className="text-slate-500 mt-1">Upload files or add links for this lecture</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                    <AddResourceForm lectureId={lectureId || ""} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddResource;
