import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useGallery } from "../hooks/useGallery";
import { Tag, Image as ImageIcon, Save } from "lucide-react";
import { GalleryImage } from "../types";

interface EditGalleryFormProps {
    galleryItem: GalleryImage;
}

export const EditGalleryForm = ({ galleryItem }: EditGalleryFormProps) => {
    const navigate = useNavigate();
    const { updateGalleryItem, isUpdating } = useGallery();

    const [formData, setFormData] = useState({
        tag: galleryItem.tag || "",
        image: null as File | null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateGalleryItem({
                galleryId: galleryItem.id,
                data: {
                    tag: formData.tag,
                    image: formData.image || undefined,
                },
            });
            navigate(`${ROUTES.MEDIA}?tab=gallery`);
        } catch {
            // Error handled by hook
        }
    };

    const formFields: FormFieldConfig[] = [
        {
            id: "tag",
            label: "Tag / Category",
            placeholder: "e.g., Classroom, Lab, Sports",
            value: formData.tag,
            onChange: (value) => setFormData({ ...formData, tag: value }),
            required: true,
            icon: Tag,
        },
        {
            id: "image",
            label: "Gallery Image (Optional)",
            placeholder: "Upload new image to replace current",
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
            onBack={() => navigate(`${ROUTES.MEDIA}?tab=gallery`)}
            headerIcon={ImageIcon}
        />
    );
};
