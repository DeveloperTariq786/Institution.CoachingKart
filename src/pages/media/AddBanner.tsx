import DashboardLayout from "@/components/layout/DashboardLayout";
import { AddBannerForm } from "@/features/media/components/AddBannerForm";

const AddBanner = () => {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto py-6">
                <AddBannerForm />
            </div>
        </DashboardLayout>
    );
};

export default AddBanner;
