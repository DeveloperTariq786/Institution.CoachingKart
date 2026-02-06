import { useState } from "react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { CreateStudentPayload } from "../types/user.types";
import { useStudents } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";

export function AddStudentForm() {
    const navigate = useNavigate();
    const { createStudent, isCreating } = useStudents();
    const [formData, setFormData] = useState<CreateStudentPayload>({
        name: "",
        email: "",
        password: "",
    });

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
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter strong password",
            value: formData.password,
            onChange: (val) => setFormData({ ...formData, password: val }),
            required: true,
            icon: Lock,
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
