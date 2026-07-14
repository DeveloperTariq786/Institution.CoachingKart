import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useBanner } from "../hooks/useBanner";
import { LayoutTemplate, FileText, Image as ImageIcon, Save } from "lucide-react";
import { BannerImage } from "../types";

interface EditBannerFormProps {
    banner: BannerImage;
}

export const EditBannerForm = ({ banner }: EditBannerFormProps) => {
    const navigate = useNavigate();
    const { updateBannerItem, isUpdating } = useBanner();

    const [formData, setFormData] = useState({
        heading: banner.heading || "",
        description: banner.description || "",
        image: null as File | null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateBannerItem({
                bannerId: banner.id,
                data: {
                    heading: formData.heading,
                    description: formData.description,
                    image: formData.image || undefined,
                },
            });
            navigate(`${ROUTES.MEDIA}?tab=banners`);
        } catch {
            // Error handled by hook
        }
    };

    const formFields: FormFieldConfig[] = [
        {
            id: "heading",
            label: "Heading",
            placeholder: "Enter banner heading",
            value: formData.heading,
            onChange: (value) => setFormData({ ...formData, heading: value }),
            required: true,
            icon: LayoutTemplate,
        },
        {
            id: "description",
            label: "Description",
            placeholder: "Enter banner description",
            value: formData.description,
            onChange: (value) => setFormData({ ...formData, description: value }),
            required: true,
            componentType: "textarea",
            icon: FileText,
        },
        {
            id: "image",
            label: "Banner Image (Optional)",
            placeholder: "Upload new banner photo to replace current",
            value: formData.image,
            onChange: (file) => setFormData({ ...formData, image: file }),
            required: false,
            componentType: "file",
            icon: ImageIcon,
            accept: "image/*",
        },
    ];

    return (
        <CommonForm
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText="Save Changes"
            isLoading={isUpdating}
            submitButtonIcon={Save}
            onBack={() => navigate(`${ROUTES.MEDIA}?tab=banners`)}
            headerIcon={LayoutTemplate}
        />
    );
};
