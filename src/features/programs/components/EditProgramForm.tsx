import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { usePrograms } from "@/features/programs/hooks/usePrograms";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { BookOpen, GraduationCap, School } from "lucide-react";
import { useState, useEffect } from "react";
import { Program } from "@/features/programs/types/program";

interface EditProgramFormProps {
    program: Program;
}

export const EditProgramForm = ({ program }: EditProgramFormProps) => {
    const navigate = useNavigate();
    const { updateProgram, isProcessing } = usePrograms();
    const { courses, fetchCourses } = useCourses();
    const [formData, setFormData] = useState({
        name: program.name || "",
        courseId: program.courseId || "",
    });

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        setFormData({
            name: program.name || "",
            courseId: program.courseId || "",
        });
    }, [program]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await updateProgram(program.id, formData);
        if (success) {
            navigate(ROUTES.PROGRAMS);
        }
    };

    const handleCourseChange = (courseName: string) => {
        const selectedCourse = courses.find(c => c.name === courseName);
        if (selectedCourse) {
            setFormData({ ...formData, courseId: selectedCourse.id });
        }
    };

    const getCourseName = (id: string) => courses.find(c => c.id === id)?.name || "";

    const formFields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Program Name",
            placeholder: "e.g., Class 11, Dropper Batch, Crash Course",
            value: formData.name,
            onChange: (value) => setFormData({ ...formData, name: value }),
            required: true,
            icon: GraduationCap,
            colSpan: 2,
        },
        {
            id: "course",
            label: "Select Course",
            placeholder: "Select a course",
            value: getCourseName(formData.courseId),
            onChange: handleCourseChange,
            required: true,
            componentType: "select",
            options: courses.map(c => c.name),
            icon: School,
        },
    ];

    return (
        <CommonForm
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText="Update Program"
            isLoading={isProcessing}
            onBack={() => navigate(ROUTES.PROGRAMS)}
            headerIcon={BookOpen}
        />
    );
};
