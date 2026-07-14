import { useState, useEffect } from "react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { User, Mail, Phone, Layers, IndianRupee, Tag as TagIcon, Save, Calendar } from "lucide-react";
import { InstitutionStudent, UpdateStudentEnrollmentPayload } from "../types/user.types";
import { useStudents } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { useInstitutionProfile } from "@/features/Institution/hooks/useInstitutionProfile";
import { toDateTimeLocalValue } from "@/lib/formatDateTimeLocal";
import { toast } from "sonner";
import { validateEmail } from "../utils/validation";

interface EditStudentFormProps {
    student: InstitutionStudent;
}

export function EditStudentForm({ student }: EditStudentFormProps) {
    const navigate = useNavigate();
    const { updateStudent, isUpdating } = useStudents();
    const { batches, fetchBatches } = useBatches();
    const { profile } = useInstitutionProfile();
    const institutionId = profile?.id;

    const [formData, setFormData] = useState<UpdateStudentEnrollmentPayload>({
        name: student.user.name || "",
        email: student.user.email || "",
        phone: (student.user as any).phone || (student as any).phone || "", 
        batchId: student.batchId || student.batch?.id || "",
        feePaid: student.feePaid || 0,
        discount: student.discount || 0,
        expiresAt: student.expiresAt
            ? toDateTimeLocalValue(student.expiresAt)
            : toDateTimeLocalValue(new Date()),
    });

    useEffect(() => {
        if (institutionId) {
            fetchBatches({ institutionId }, 1, 100);
        }
    }, [institutionId, fetchBatches]);

    const fields: FormFieldConfig[] = [
        {
            id: "name",
            label: "Full Name",
            placeholder: "Enter full name",
            value: formData.name || "",
            onChange: (val) => setFormData({ ...formData, name: val }),
            required: true,
            icon: User,
            colSpan: 2,
        },
        {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Enter email address",
            value: formData.email || "",
            onChange: (val) => setFormData({ ...formData, email: val }),
            required: true,
            icon: Mail,
        },
        {
            id: "phone",
            label: "Phone Number",
            placeholder: "e.g., +91-9876543210",
            value: formData.phone || "",
            onChange: (val) => setFormData({ ...formData, phone: val }),
            required: false,
            icon: Phone,
        },
        {
            id: "batch",
            label: "Assign Batch",
            placeholder: "Select a batch",
            value: batches.find(b => b.id === formData.batchId)?.name || "",
            onChange: (val) => {
                const batch = batches.find(b => b.name === val);
                if (batch) setFormData({ ...formData, batchId: batch.id });
            },
            required: true,
            componentType: "select",
            options: batches.map(b => b.name),
            icon: Layers,
        },
        {
            id: "feePaid",
            label: "Fee Paid",
            type: "number",
            placeholder: "Enter amount",
            value: formData.feePaid || 0,
            onChange: (val) => setFormData({ ...formData, feePaid: Number(val) }),
            required: true,
            icon: IndianRupee,
        },
        {
            id: "discount",
            label: "Discount",
            type: "number",
            placeholder: "Enter discount amount",
            value: formData.discount || 0,
            onChange: (val) => setFormData({ ...formData, discount: Number(val) }),
            required: true,
            icon: TagIcon,
        },
        {
            id: "expiresAt",
            label: "Expires At",
            type: "datetime-local",
            placeholder: "Select expiration date",
            value: formData.expiresAt || "",
            onChange: (val) => setFormData({ ...formData, expiresAt: val }),
            required: false,
            icon: Calendar,
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.email && !validateEmail(formData.email)) {
            toast.error("Invalid email address format.");
            return;
        }

        try {
            await updateStudent({
                enrollmentId: student.id,
                payload: {
                    ...formData,
                    expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : null,
                },
            });
            navigate(ROUTES.STUDENTS);
        } catch (error) {
            // Managed by hook
        }
    };

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Save Changes"
            isLoading={isUpdating}
            submitButtonIcon={Save}
            onBack={() => navigate(ROUTES.STUDENTS)}
        />
    );
}
