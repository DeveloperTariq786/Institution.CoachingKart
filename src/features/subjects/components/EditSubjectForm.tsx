import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { Book, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { SUBJECT_ICONS, ICON_MAP } from "@/constants/subjects";
import { Subject } from "@/features/subjects/types/subject";

interface EditSubjectFormProps {
    subject: Subject;
}

export const EditSubjectForm = ({ subject }: EditSubjectFormProps) => {
    const navigate = useNavigate();
    const { updateSubject, isProcessing } = useSubjects();

    const getIconLabel = (iconUrl: string) => {
        for (const [label, url] of Object.entries(ICON_MAP)) {
            if (url === iconUrl) return label;
        }
        return "Book"; // default fallback
    };

    const [formData, setFormData] = useState({
        name: subject.name || "",
        iconLabel: getIconLabel(subject.icon),
        icon: subject.icon || "",
    });

    useEffect(() => {
        setFormData({
            name: subject.name || "",
            iconLabel: getIconLabel(subject.icon),
            icon: subject.icon || "",
        });
    }, [subject]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = {
            name: formData.name,
            icon: formData.icon,
        };
        const success = await updateSubject(subject.id, submitData);
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
            submitButtonText="Update Subject"
            isLoading={isProcessing}
            onBack={() => navigate(ROUTES.SUBJECTS)}
            headerIcon={Book}
        />
    );
};
