import { useState, useEffect } from "react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { UserPlus, User, Mail, Lock, Phone, Layers, IndianRupee, Tag as TagIcon } from "lucide-react";
import { CreateStudentPayload } from "../types/user.types";
import { useStudents } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { useInstitutionProfile } from "@/features/Institution/hooks/useInstitutionProfile";

export function AddStudentForm() {
    const navigate = useNavigate();
    const { createStudent, isCreating } = useStudents();
    const { batches, fetchBatches } = useBatches();
    const { profile } = useInstitutionProfile();
    const institutionId = profile?.id;

    const [formData, setFormData] = useState<CreateStudentPayload>({
        name: "",
        email: "",
        phone: "",
        password: "",
        batchId: "",
        feePaid: 0,
        discount: 0,
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
            value: formData.name,
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
            value: formData.email,
            onChange: (val) => setFormData({ ...formData, email: val }),
            required: true,
            icon: Mail,
        },
        {
            id: "phone",
            label: "Phone Number",
            placeholder: "e.g., +91-9876543210",
            value: formData.phone,
            onChange: (val) => setFormData({ ...formData, phone: val }),
            required: true,
            icon: Phone,
        },
        {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter strong password",
            value: formData.password,
            onChange: (val) => setFormData({ ...formData, password: val }),
            required: true,
            icon: Lock,
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
            value: formData.feePaid,
            onChange: (val) => setFormData({ ...formData, feePaid: Number(val) }),
            required: true,
            icon: IndianRupee,
        },
        {
            id: "discount",
            label: "Discount",
            type: "number",
            placeholder: "Enter discount amount",
            value: formData.discount,
            onChange: (val) => setFormData({ ...formData, discount: Number(val) }),
            required: true,
            icon: TagIcon,
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createStudent(formData);
            navigate(ROUTES.STUDENTS);
        } catch (error) {
            // Error handling is managed by the hook
        }
    };

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Create Student Account"
            isLoading={isCreating}
            submitButtonIcon={UserPlus}
            onBack={() => navigate(ROUTES.STUDENTS)}
        />
    );
}
