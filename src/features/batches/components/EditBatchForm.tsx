import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { usePrograms } from "@/features/programs/hooks/usePrograms";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { BookOpen, GraduationCap, School, Users, IndianRupee, Notebook, Check, Image } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Batch } from "@/features/batches/types/batch";

interface EditBatchFormProps {
    batch: Batch;
}

export const EditBatchForm = ({ batch }: EditBatchFormProps) => {
    const navigate = useNavigate();
    const { updateBatch, isProcessing } = useBatches();
    const { courses, fetchCourses } = useCourses();
    const { programs, fetchPrograms } = usePrograms();
    const { subjects, fetchSubjects } = useSubjects();

    // Derive courseId from the batch's program relation
    const initialCourseId = batch.program?.courseId || "";

    const [formData, setFormData] = useState({
        session: batch.session || "",
        name: batch.name || "",
        description: batch.description || "",
        academicFee: batch.academicFee || "",
        courseId: initialCourseId,
        programId: batch.programId || "",
        subjectIds: batch.subjects?.map(s => s.subjectId) || [],
        thumbnail: (batch.thumbnail || "") as File | string | null,
    });

    useEffect(() => {
        fetchCourses();
        fetchSubjects();
    }, [fetchCourses, fetchSubjects]);

    // Re-sync form data when batch prop changes
    useEffect(() => {
        setFormData({
            session: batch.session || "",
            name: batch.name || "",
            description: batch.description || "",
            academicFee: batch.academicFee || "",
            courseId: batch.program?.courseId || "",
            programId: batch.programId || "",
            subjectIds: batch.subjects?.map(s => s.subjectId) || [],
            thumbnail: (batch.thumbnail || "") as File | string | null,
        });
    }, [batch]);

    // Fetch programs when courseId changes
    useEffect(() => {
        if (formData.courseId) {
            fetchPrograms({ courseId: formData.courseId });
        }
    }, [formData.courseId, fetchPrograms]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, description, academicFee, subjectIds, thumbnail } = formData;
        const success = await updateBatch(batch.id, {
            name,
            description,
            academicFee: academicFee.toString(),
            subjectIds,
            thumbnail,
        });
        if (success) {
            navigate(ROUTES.BATCHES);
        }
    };

    const handleCourseChange = (courseName: string) => {
        const selectedCourse = courses.find(c => c.name === courseName);
        if (selectedCourse) {
            setFormData({ ...formData, courseId: selectedCourse.id, programId: "" });
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
            disabled: true,
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
            disabled: true,
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
            disabled: true,
        },
        {
            id: "thumbnail",
            label: "Batch Thumbnail",
            value: formData.thumbnail,
            onChange: () => {},
            componentType: "custom",
            colSpan: 2,
            customComponent: (
                <div className="space-y-3">
                    <div className="relative">
                        <Image className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 pointer-events-none" />
                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files ? e.target.files[0] : null })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10 text-sm focus-visible:ring-primary/20 transition-all pl-11 pt-2"
                        />
                    </div>
                    {formData.thumbnail && (
                        <div className="relative w-32 h-32 rounded-lg border overflow-hidden bg-slate-50">
                            <img
                                src={
                                    formData.thumbnail instanceof File 
                                        ? URL.createObjectURL(formData.thumbnail) 
                                        : (formData.thumbnail.startsWith("http://") || formData.thumbnail.startsWith("https://") || formData.thumbnail.startsWith("/") 
                                            ? formData.thumbnail 
                                            : `https://${formData.thumbnail}`)
                                }
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            )
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
            onChange: () => { },
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
            submitButtonText="Update Batch"
            isLoading={isProcessing}
            onBack={() => navigate(ROUTES.BATCHES)}
            headerIcon={Users}
        />
    );
};
