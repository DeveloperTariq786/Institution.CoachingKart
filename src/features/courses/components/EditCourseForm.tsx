import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { GraduationCap, Palette, Type } from "lucide-react";
import { COURSE_ICONS, COURSE_COLORS, ICON_MAP, COLOR_MAP } from "@/constants/courses";
import { CoursePreview } from "@/features/courses/components/CoursePreview";
import { Course } from "@/features/courses/types/course";

interface EditCourseFormProps {
    course: Course;
}

export const EditCourseForm = ({ course }: EditCourseFormProps) => {
    const navigate = useNavigate();
    const { updateCourse, isLoading } = useCourses();

    // Reverse-map the icon URL and color value back to their labels
    const getIconLabel = (iconUrl: string) => {
        for (const [label, url] of Object.entries(ICON_MAP)) {
            if (url === iconUrl) return label;
        }
        return "";
    };

    const getColorLabel = (colorValue: string) => {
        for (const [label, colorObj] of Object.entries(COLOR_MAP)) {
            if (colorObj.bg === colorValue) return label;
        }
        return "";
    };

    const [formData, setFormData] = useState({
        name: course.name || "",
        iconLabel: getIconLabel(course.icon),
        colorLabel: getColorLabel(course.color),
        icon: course.icon || "",
        color: course.color || "",
    });

    useEffect(() => {
        setFormData({
            name: course.name || "",
            iconLabel: getIconLabel(course.icon),
            colorLabel: getColorLabel(course.color),
            icon: course.icon || "",
            color: course.color || "",
        });
    }, [course]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = {
            name: formData.name,
            icon: formData.icon,
            color: formData.color,
        };
        const success = await updateCourse(course.id, submitData);
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
            submitButtonText="Update Course"
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
