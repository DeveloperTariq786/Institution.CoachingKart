import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { GraduationCap, Palette, Type } from "lucide-react";
import { COURSE_ICONS, COURSE_COLORS, ICON_MAP, COLOR_MAP } from "@/constants/courses";
import { CoursePreview } from "@/features/courses/components/CoursePreview";

export const AddCourseForm = () => {
    const navigate = useNavigate();
    const { createCourse, isLoading } = useCourses();
    const [formData, setFormData] = useState({
        name: "",
        iconLabel: "", // Store the label for preview
        colorLabel: "", // Store the label for preview
        icon: "", // Store the actual URL
        color: "", // Store the actual color value
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = {
            name: formData.name,
            icon: formData.icon,
            color: formData.color,
        };
        const success = await createCourse(submitData);
        if (success) {
            navigate(ROUTES.COURSES);
        }
    };

    const handleIconChange = (value: string) => {
        const iconUrl = ICON_MAP[value] || "";
        setFormData({ ...formData, iconLabel: value, icon: iconUrl });
    };

    const handleColorChange = (value: string) => {
        const colorValue = COLOR_MAP[value]?.bg || "";
        setFormData({ ...formData, colorLabel: value, color: colorValue });
    };

    const fields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Course Name",
            placeholder: "e.g., NEET, IIT JEE, Pre Foundation",
            value: formData.name,
            onChange: (value) => setFormData({ ...formData, name: value }),
            required: true,
            icon: Type,
            colSpan: 2,
        },
        {
            id: "icon",
            label: "Icon",
            placeholder: "Select an icon",
            value: formData.iconLabel,
            onChange: handleIconChange,
            required: true,
            componentType: "select",
            options: COURSE_ICONS.map(opt => opt.value),
            icon: GraduationCap,
        },
        {
            id: "color",
            label: "Color",
            placeholder: "Select a color",
            value: formData.colorLabel,
            onChange: handleColorChange,
            required: true,
            componentType: "select",
            options: COURSE_COLORS.map(opt => opt.value),
            icon: Palette,
        },
    ];

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Create Course"
            isLoading={isLoading}
            onBack={() => navigate(ROUTES.COURSES)}
            headerIcon={GraduationCap}
        >
            <CoursePreview
                name={formData.name}
                icon={formData.iconLabel}
                color={formData.colorLabel}
            />
        </CommonForm>
    );
};
