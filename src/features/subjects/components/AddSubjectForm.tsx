import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { Book, Sparkles } from "lucide-react";
import { useState } from "react";
import { SUBJECT_ICONS, ICON_MAP } from "@/constants/subjects";

export const AddSubjectForm = () => {
    const navigate = useNavigate();
    const { createSubject, isProcessing } = useSubjects();

    const [formData, setFormData] = useState({
        name: "",
        iconLabel: "Book",
        icon: ICON_MAP["Book"],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = {
            name: formData.name,
            icon: formData.icon,
        };
        const success = await createSubject(submitData);
        if (success) {
            navigate(ROUTES.SUBJECTS);
        }
    };

    const handleIconChange = (value: string) => {
        const iconUrl = ICON_MAP[value] || "";
        setFormData({ ...formData, iconLabel: value, icon: iconUrl });
    };

    const formFields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Subject Name",
            placeholder: "e.g., Physics, Mathematics",
            value: formData.name,
            onChange: (value) => setFormData({ ...formData, name: value }),
            required: true,
            icon: Book,
            colSpan: 2,
        },
        {
            id: "icon",
            label: "Select Icon",
            placeholder: "Icon type",
            value: formData.iconLabel,
            onChange: handleIconChange,
            required: true,
            componentType: "select",
            options: SUBJECT_ICONS.map(opt => opt.value),
            icon: Sparkles,
            colSpan: 2,
        },
    ];

    return (
        <CommonForm
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText="Create Subject"
            isLoading={isProcessing}
            onBack={() => navigate(ROUTES.SUBJECTS)}
            headerIcon={Book}
        />
    );
};
