import DashboardLayout from "@/components/layout/DashboardLayout";
import { AddResultForm } from "@/features/results/components/AddResultForm";

const AddResult = () => {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto py-6">
                <AddResultForm />
            </div>
        </DashboardLayout>
    );
};

export default AddResult;
