import { useState } from "react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { UserPlus, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { CreateAdminPayload } from "../types/user.types";
import { useAdmins } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { toast } from "sonner";
import { validateEmail, validatePassword } from "../utils/validation";

export function AddAdminForm() {
    const navigate = useNavigate();
    const { createAdmin, isCreating } = useAdmins();
    const [formData, setFormData] = useState<CreateAdminPayload>({
        name: "",
        email: "",
        password: "",
        institutionRole: "INSTITUTION_ADMIN",
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
        {
            id: "institutionRole",
            label: "Admin Role",
            componentType: "select",
            placeholder: "Select role",
            options: ["INSTITUTION_ADMIN", "INSTITUTION_SUPER_ADMIN"],
            value: formData.institutionRole,
            onChange: (val) => setFormData({ ...formData, institutionRole: val as any }),
            required: true,
            icon: ShieldCheck,
            colSpan: 2,
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateEmail(formData.email)) {
            toast.error("Invalid email address format.");
            return;
        }

        const passwordCheck = validatePassword(formData.password);
        if (!passwordCheck.isValid) {
            toast.error(passwordCheck.message);
            return;
        }

        try {
            await createAdmin(formData);
            navigate(ROUTES.ADMINS);
        } catch (error) {
            // Error is handled by the hook toast
        }
    };

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Create Admin Account"
            isLoading={isCreating}
            submitButtonIcon={UserPlus}
            onBack={() => navigate(ROUTES.ADMINS)}
        />
    );
}
