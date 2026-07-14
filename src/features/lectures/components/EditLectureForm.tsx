import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useLectures } from "@/features/lectures/hooks/useLectures";
import { useFaculty } from "@/features/faculty/hooks/useFaculty";
import { Type, FileText, User, Image as ImageIcon, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { Lecture } from "../types/lecture";

interface EditLectureFormProps {
    lecture: Lecture;
}

export const EditLectureForm = ({ lecture }: EditLectureFormProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateLecture, isProcessing } = useLectures();
    const { faculty, fetchFaculty } = useFaculty();

    const [formData, setFormData] = useState({
        title: lecture.title || "",
        description: lecture.description || "",
        facultyId: lecture.facultyId || "",
        thumbnail: null as File | null,
    });

    useEffect(() => {
        fetchFaculty();
    }, [fetchFaculty]);

    // Keep form data synced if lecture prop changes
    useEffect(() => {
        setFormData({
            title: lecture.title || "",
            description: lecture.description || "",
            facultyId: lecture.facultyId || "",
            thumbnail: null,
        });
    }, [lecture]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await updateLecture(lecture.id, {
            title: formData.title,
            description: formData.description,
            facultyId: formData.facultyId,
            thumbnail: formData.thumbnail,
        });

        if (success) {
            navigate(location.state?.from || ROUTES.LECTURES);
        }
    };

    const handleFacultyChange = (facultyName: string) => {
        const member = faculty.find(f => f.name === facultyName);
        if (member) {
            setFormData({ ...formData, facultyId: member.id });
        }
    };

    const getFacultyName = (id: string) => faculty.find(f => f.id === id)?.name || "";

    const formFields: FormFieldConfig[] = [
        {
            id: "title",
            label: "Lecture Title",
            placeholder: "e.g., Why Atoms are non living",
            value: formData.title,
            onChange: (value) => setFormData({ ...formData, title: value }),
            required: true,
            icon: Type,
            colSpan: 2,
        },
        {
            id: "faculty",
            label: "Faculty",
            placeholder: "Select faculty",
            value: getFacultyName(formData.facultyId),
            onChange: handleFacultyChange,
            required: true,
            componentType: "select",
            options: faculty.map(f => f.name),
            icon: User,
            colSpan: 2,
        },
        {
            id: "thumbnail",
            label: "New Thumbnail Image (Optional)",
            placeholder: "Upload new thumbnail to replace current one",
            value: formData.thumbnail,
            onChange: (file) => setFormData({ ...formData, thumbnail: file }),
            required: false,
            componentType: "file",
            icon: ImageIcon,
            accept: "image/*",
            colSpan: 2,
        },
        {
            id: "description",
            label: "Description",
            placeholder: "Enter lecture description...",
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
            submitButtonText="Update Lecture"
            isLoading={isProcessing}
            onBack={() => navigate(location.state?.from || ROUTES.LECTURES)}
            headerIcon={Video}
        />
    );
};
