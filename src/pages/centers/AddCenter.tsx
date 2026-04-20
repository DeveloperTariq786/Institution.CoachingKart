import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { AddCenterForm } from "@/features/centers/components/AddCenterForm";

const AddCenter = () => {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-slate-900">Add New Center</h1>
                    <p className="text-slate-500 mt-1">Register a new physical branch for your institution.</p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        <AddCenterForm />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default AddCenter;
