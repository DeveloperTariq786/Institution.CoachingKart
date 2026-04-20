import DashboardLayout from "@/components/layout/DashboardLayout";
import { AddGalleryForm } from "@/features/media/components/AddGalleryForm";

const AddGallery = () => {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto py-6">
                <AddGalleryForm />
            </div>
        </DashboardLayout>
    );
};

export default AddGallery;
