import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useFaculty } from "@/features/faculty/hooks/useFaculty";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { User, Briefcase, Tag, FileText, Book, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Faculty } from "../types/faculty";

interface EditFacultyFormProps {
    faculty: Faculty;
}

export const EditFacultyForm = ({ faculty }: EditFacultyFormProps) => {
    const navigate = useNavigate();
    const { updateFaculty, isProcessing } = useFaculty();
    const { subjects, fetchSubjects } = useSubjects();

    // Clean experience value to extract number for initial state
    const cleanExperience = (exp: string) => {
        const num = parseInt(exp.replace(/\D/g, ""), 10);
        return isNaN(num) ? 0 : num;
    };

    const [formData, setFormData] = useState({
        name: faculty.name || "",
        experience: cleanExperience(faculty.experience),
        tag: faculty.tag || "",
        description: faculty.description || "",
        subjectId: faculty.subjectId || faculty.subject?.id || "",
    });

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await updateFaculty(faculty.id, formData);
        if (success) {
            navigate(ROUTES.FACULTY);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    };

    const handleSubjectChange = (subjectName: string) => {
        const subject = subjects.find(s => s.name === subjectName);
        if (subject) {
            setFormData({ ...formData, subjectId: subject.id });
        }
    };

    const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || "";

    const formFields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Full Name",
            placeholder: "e.g., Dr. Raj Patel",
            value: formData.name,
            onChange: (value) => setFormData({ ...formData, name: value }),
            required: true,
            icon: User,
        },
        {
            id: "experience",
            label: "Experience (Years)",
            placeholder: "e.g., 10",
            type: "number",
            value: formData.experience,
            onChange: (value) => setFormData({ ...formData, experience: Number(value) }),
            required: true,
            icon: Briefcase,
        },
        {
            id: "tag",
            label: "Tag/Headline",
            placeholder: "e.g., Chemistry Faculty",
            value: formData.tag,
            onChange: (value) => setFormData({ ...formData, tag: value }),
            required: true,
            icon: Tag,
        },
        {
            id: "subject",
            label: "Specialization Subject",
            placeholder: "Select a subject",
            value: getSubjectName(formData.subjectId),
            onChange: handleSubjectChange,
            required: true,
            componentType: "select",
            options: subjects.map(s => s.name),
            icon: Book,
        },
        {
            id: "description",
            label: "Detailed Description",
            placeholder: "Chemistry Faculty with expertise in Organic Chemistry...",
            value: formData.description,
            onChange: (value) => setFormData({ ...formData, description: value }),
            required: true,
            componentType: "textarea",
            icon: FileText,
            colSpan: 2,
        },
    ];

    return (
        <CommonForm
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText="Save Changes"
            isLoading={isProcessing}
            onBack={() => navigate(ROUTES.FACULTY)}
            headerIcon={User}
            submitButtonIcon={Save}
        />
    );
};
