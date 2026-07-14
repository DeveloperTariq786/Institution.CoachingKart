import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useResults } from "../hooks/useResults";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useStudents } from "@/features/users/hooks/useUsers";
import { Trophy, User, BookOpen, Calendar, FileType, Image as ImageIcon, Save } from "lucide-react";
import { Result } from "../types";

interface EditResultFormProps {
    result: Result;
}

export const EditResultForm = ({ result }: EditResultFormProps) => {
    const navigate = useNavigate();
    const { updateResult, isProcessing } = useResults();
    const { courses, fetchCourses } = useCourses();
    const { students, refetch: fetchStudents } = useStudents(1, 100);

    const [formData, setFormData] = useState({
        courseId: "",
        enrollmentId: "",
        rank: result.rank || "",
        score: result.score || "",
        session: result.session || "",
        profile: null as File | null,
    });

    useEffect(() => {
        fetchCourses();
        fetchStudents();
    }, [fetchCourses, fetchStudents]);

    // Pre-populate courseId and enrollmentId once courses and students load
    useEffect(() => {
        if (courses && courses.length > 0 && !formData.courseId) {
            const matchedCourse = courses.find(c => c.name === result.courseName);
            if (matchedCourse) {
                setFormData(prev => ({ ...prev, courseId: matchedCourse.id }));
            }
        }
    }, [courses, result.courseName, formData.courseId]);

    useEffect(() => {
        if (students && students.length > 0 && !formData.enrollmentId) {
            const matchedStudent = students.find(s => s.user.name === result.studentName);
            if (matchedStudent) {
                setFormData(prev => ({ ...prev, enrollmentId: matchedStudent.id }));
            }
        }
    }, [students, result.studentName, formData.enrollmentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await updateResult(result.id, {
            rank: formData.rank,
            score: formData.score,
            session: formData.session,
            courseId: formData.courseId || undefined,
            enrollmentId: formData.enrollmentId || undefined,
            profile: formData.profile || undefined,
        });

        if (success) {
            navigate(ROUTES.RESULTS);
        }
    };

    const handleCourseChange = (courseName: string) => {
        const matched = courses?.find(c => c.name === courseName);
        if (matched) {
            setFormData({ ...formData, courseId: matched.id });
        }
    };

    const handleStudentChange = (studentDisplayName: string) => {
        const matched = students?.find(s => `${s.user.name} (${s.batch.name})` === studentDisplayName);
        if (matched) {
            setFormData({ ...formData, enrollmentId: matched.id });
        }
    };

    const getCourseName = (id: string) => courses?.find(c => c.id === id)?.name || result.courseName || "";
    const getStudentDisplayName = (id: string) => {
        const student = students?.find(s => s.id === id);
        return student ? `${student.user.name} (${student.batch.name})` : result.studentName || "";
    };

    const formFields: FormFieldConfig[] = [
        {
            id: "course",
            label: "Course",
            placeholder: "Select a course",
            value: getCourseName(formData.courseId),
            onChange: handleCourseChange,
            required: true,
            componentType: "select",
            options: courses ? courses.map(c => c.name) : [],
            icon: BookOpen,
        },
        {
            id: "student",
            label: "Student",
            placeholder: "Select student",
            value: getStudentDisplayName(formData.enrollmentId),
            onChange: handleStudentChange,
            required: true,
            componentType: "select",
            options: students ? students.map(s => `${s.user.name} (${s.batch.name})`) : [],
            icon: User,
        },
        {
            id: "session",
            label: "Session Year",
            placeholder: "e.g., 2024",
            value: formData.session,
            onChange: (value) => setFormData({ ...formData, session: value }),
            required: true,
            icon: Calendar,
        },
        {
            id: "rank",
            label: "Rank achieved",
            placeholder: "e.g., 1",
            value: formData.rank,
            onChange: (value) => setFormData({ ...formData, rank: value }),
            required: true,
            icon: Trophy,
        },
        {
            id: "score",
            label: "Score",
            placeholder: "e.g., 600/720",
            value: formData.score,
            onChange: (value) => setFormData({ ...formData, score: value }),
            required: true,
            icon: FileType,
        },
        {
            id: "profile",
            label: "Student Photo (Optional)",
            placeholder: "Upload new student photo to replace",
            value: formData.profile,
            onChange: (file) => setFormData({ ...formData, profile: file }),
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
            isLoading={isProcessing}
            submitButtonIcon={Save}
            onBack={() => navigate(ROUTES.RESULTS)}
            headerIcon={Trophy}
        />
    );
};
