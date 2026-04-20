import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useFaculty } from "@/features/faculty/hooks/useFaculty";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { User, Briefcase, Tag, FileText, Book, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

export const AddFacultyForm = () => {
    const navigate = useNavigate();
    const { createFaculty, isProcessing } = useFaculty();
    const { subjects, fetchSubjects } = useSubjects();

    const [formData, setFormData] = useState({
        name: "",
        experience: "",
        tag: "",
        description: "",
        subjectId: "",
        profileimage: null as File | null,
    });

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await createFaculty({
            ...formData,
            profileimage: formData.profileimage || undefined
        });
        if (success) {
            navigate(ROUTES.FACULTY);
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
            label: "Experience",
            placeholder: "e.g., 10+ Yrs",
            value: formData.experience,
            onChange: (value) => setFormData({ ...formData, experience: value }),
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
            id: "profileimage",
            label: "Profile Image",
            placeholder: "Upload image",
            value: formData.profileimage,
            onChange: (file) => setFormData({ ...formData, profileimage: file }),
            required: true,
            componentType: "file",
            icon: ImageIcon,
            accept: "image/*",
            colSpan: 2,
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
            submitButtonText="Create Faculty"
            isLoading={isProcessing}
            onBack={() => navigate(ROUTES.FACULTY)}
            headerIcon={User}
        />
    );
};
