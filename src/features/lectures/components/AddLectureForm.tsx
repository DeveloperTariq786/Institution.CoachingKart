import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useLectures } from "@/features/lectures/hooks/useLectures";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { useFaculty } from "@/features/faculty/hooks/useFaculty";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { useInstitutionProfile } from "@/features/Institution/hooks/useInstitutionProfile";
import { Type, FileText, Book, User, Video, Image as ImageIcon, Layers } from "lucide-react";
import { useState, useEffect } from "react";

export const AddLectureForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const passedBatchId = location.state?.batchId;
    const passedBatchSubjectId = location.state?.batchSubjectId;
    const passedSubjectId = location.state?.subjectId;
    const { createLecture, isProcessing } = useLectures();
    const { subjects, fetchSubjects } = useSubjects();
    const { faculty, fetchFaculty } = useFaculty();
    const { batches, fetchBatches } = useBatches();
    const { profile } = useInstitutionProfile();
    const institutionId = profile?.id;

    const [selectedBatchId, setSelectedBatchId] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        batchSubjectId: "",
        subjectId: "",
        facultyId: "",
        video: null as File | null,
        thumbnail: null as File | null,
    });

    useEffect(() => {
        if (institutionId) {
            fetchBatches({ institutionId }, 1, 100);
        }
        fetchFaculty();
    }, [institutionId, fetchBatches, fetchFaculty]);

    // Handle initial batch selection if passed via state
    useEffect(() => {
        if (passedBatchId && batches.length > 0) {
            const batch = batches.find(b => b.id === passedBatchId);
            if (batch) {
                setSelectedBatchId(batch.id);

                // If subject was also passed, try to pre-select it
                if (passedBatchSubjectId) {
                    const subject = batch.subjects?.find(s => s.batchSubjectId === passedBatchSubjectId);
                    if (subject) {
                        setFormData(prev => ({
                            ...prev,
                            batchSubjectId: subject.batchSubjectId,
                            subjectId: subject.subjectId
                        }));
                    }
                }
            }
        }
    }, [passedBatchId, passedBatchSubjectId, batches]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.video || !formData.thumbnail) return;

        const success = await createLecture({
            title: formData.title,
            description: formData.description,
            batchSubjectId: formData.batchSubjectId,
            subjectId: formData.subjectId,
            facultyId: formData.facultyId,
            video: formData.video,
            thumbnail: formData.thumbnail,
        });

        if (success) {
            navigate(location.state?.from || ROUTES.LECTURES);
        }
    };

    const currentBatch = batches.find(b => b.id === selectedBatchId);
    const availableSubjects = currentBatch?.subjects || [];

    const handleBatchChange = (batchName: string) => {
        const batch = batches.find(b => b.name === batchName);
        if (batch) {
            setSelectedBatchId(batch.id);
            setFormData({ ...formData, batchSubjectId: "", subjectId: "" });
        }
    };

    const handleSubjectChange = (subjectName: string) => {
        const subject = availableSubjects.find(s => s.subject.name === subjectName);
        if (subject) {
            setFormData({
                ...formData,
                batchSubjectId: subject.batchSubjectId,
                subjectId: subject.subjectId
            });
        }
    };

    const handleFacultyChange = (facultyName: string) => {
        const member = faculty.find(f => f.name === facultyName);
        if (member) {
            setFormData({ ...formData, facultyId: member.id });
        }
    };

    const getBatchName = (id: string) => batches.find(b => b.id === id)?.name || "";
    const getSubjectName = (batchSubjectId: string) => availableSubjects.find(s => s.batchSubjectId === batchSubjectId)?.subject.name || "";
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
            id: "batch",
            label: "Batch",
            placeholder: "Select a batch",
            value: getBatchName(selectedBatchId),
            onChange: handleBatchChange,
            required: true,
            componentType: "select",
            options: batches.map(b => b.name),
            icon: Layers,
            disabled: !!passedBatchId,
        },
        {
            id: "subject",
            label: "Subject",
            placeholder: selectedBatchId ? "Select a subject" : "Select batch first",
            value: getSubjectName(formData.batchSubjectId),
            onChange: handleSubjectChange,
            required: true,
            componentType: "select",
            options: availableSubjects.map(s => s.subject.name),
            icon: Book,
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
        },
        {
            id: "thumbnail",
            label: "Thumbnail Image",
            placeholder: "Upload thumbnail",
            value: formData.thumbnail,
            onChange: (file) => setFormData({ ...formData, thumbnail: file }),
            required: true,
            componentType: "file",
            icon: ImageIcon,
            accept: "image/*",
        },
        {
            id: "video",
            label: "Lecture Video",
            placeholder: "Upload video file",
            value: formData.video,
            onChange: (file) => setFormData({ ...formData, video: file }),
            required: true,
            componentType: "file",
            icon: Video,
            accept: "video/*",
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
            submitButtonText="Create Lecture"
            isLoading={isProcessing}
            onBack={() => navigate(location.state?.from || ROUTES.LECTURES)}
            headerIcon={Video}
        />
    );
};
