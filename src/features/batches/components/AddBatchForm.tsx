import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { usePrograms } from "@/features/programs/hooks/usePrograms";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { BookOpen, GraduationCap, School, Users, IndianRupee, Notebook, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export const AddBatchForm = () => {
    const navigate = useNavigate();
    const { createBatch, isProcessing } = useBatches();
    const { courses, fetchCourses } = useCourses();
    const { programs, fetchPrograms } = usePrograms();
    const { subjects, fetchSubjects } = useSubjects();

    const [formData, setFormData] = useState({
        session: "",
        name: "",
        description: "",
        academicFee: "",
        courseId: "", // Helper for filtering programs
        programId: "",
        subjectIds: [] as string[],
    });

    useEffect(() => {
        fetchCourses();
        fetchSubjects();
    }, [fetchCourses, fetchSubjects]);

    // Fetch programs when courseId changes
    useEffect(() => {
        if (formData.courseId) {
            fetchPrograms({ courseId: formData.courseId });
            setFormData(prev => ({ ...prev, programId: "" })); // Reset program when course changes
        }
    }, [formData.courseId, fetchPrograms]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { session, name, description, academicFee, programId, subjectIds } = formData;
        const success = await createBatch({
            session,
            name,
            description,
            academicFee: academicFee.toString(),
            programId,
            subjectIds
        });
        if (success) {
            navigate(ROUTES.BATCHES);
        }
    };

    const handleCourseChange = (courseName: string) => {
        const selectedCourse = courses.find(c => c.name === courseName);
        if (selectedCourse) {
            setFormData({ ...formData, courseId: selectedCourse.id });
        }
    };

    const handleProgramChange = (programName: string) => {
        const selectedProgram = programs.find(p => p.name === programName);
        if (selectedProgram) {
            setFormData({ ...formData, programId: selectedProgram.id });
        }
    };

    const handleSubjectToggle = (subjectId: string) => {
        setFormData(prev => ({
            ...prev,
            subjectIds: prev.subjectIds.includes(subjectId)
                ? prev.subjectIds.filter(id => id !== subjectId)
                : [...prev.subjectIds, subjectId]
        }));
    };

    const getCourseName = (id: string) => courses.find(c => c.id === id)?.name || "";
    const getProgramName = (id: string) => programs.find(p => p.id === id)?.name || "";

    const formFields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Batch Name",
            placeholder: "e.g., Repeater Batch Phase II",
            value: formData.name,
            onChange: (value) => setFormData({ ...formData, name: value }),
            required: true,
            icon: Users,
            colSpan: 2,
        },
        {
            id: "session",
            label: "Session",
            placeholder: "e.g., Session 2026",
            value: formData.session,
            onChange: (value) => setFormData({ ...formData, session: value }),
            required: true,
            icon: GraduationCap,
        },
        {
            id: "academicFee",
            label: "Academic Fee",
            placeholder: "e.g., ₹28,000",
            value: formData.academicFee,
            onChange: (value) => setFormData({ ...formData, academicFee: value }),
            required: true,
            icon: IndianRupee,
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
        {
            id: "program",
            label: "Select Program",
            placeholder: formData.courseId ? "Select a program" : "Select a course first",
            value: getProgramName(formData.programId),
            onChange: handleProgramChange,
            required: true,
            componentType: "select",
            options: programs.map(p => p.name),
            icon: BookOpen,
        },
        {
            id: "description",
            label: "Description",
            placeholder: "Focused batch for repeaters to master high-yield topics.",
            value: formData.description,
            onChange: (value) => setFormData({ ...formData, description: value }),
            required: true,
            componentType: "textarea",
            icon: Notebook,
            colSpan: 2,
        },
        {
            id: "subjects",
            label: "Select Subjects",
            value: formData.subjectIds,
            onChange: () => { }, // Handled by handleSubjectToggle
            componentType: "custom",
            colSpan: 2,
            customComponent: (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4 rounded-xl border bg-slate-50/50">
                    {subjects.map((subject) => {
                        const isSelected = formData.subjectIds.includes(subject.id);
                        return (
                            <div
                                key={subject.id}
                                onClick={() => handleSubjectToggle(subject.id)}
                                className={cn(
                                    "relative flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none",
                                    isSelected
                                        ? "bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20"
                                        : "bg-white border-slate-200 hover:border-slate-300"
                                )}
                            >
                                <div className={cn(
                                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                                    isSelected ? "bg-primary border-primary" : "border-slate-300 bg-white"
                                )}>
                                    {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                                </div>
                                <span className={cn(
                                    "text-sm font-medium truncate",
                                    isSelected ? "text-primary" : "text-slate-600"
                                )}>
                                    {subject.name}
                                </span>
                            </div>
                        );
                    })}
                    {subjects.length === 0 && (
                        <div className="col-span-full py-6 text-center text-sm text-slate-400 italic">
                            No subjects found. Please add subjects first.
                        </div>
                    )}
                </div>
            )
        }
    ];

    return (
        <CommonForm
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText="Create Batch"
            isLoading={isProcessing}
            onBack={() => navigate(ROUTES.BATCHES)}
            headerIcon={Users}
        />
    );
};
