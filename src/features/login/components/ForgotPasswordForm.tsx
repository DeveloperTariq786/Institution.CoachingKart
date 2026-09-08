import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useResetPassword } from "@/features/login/hooks/useResetPassword";
import { validatePassword } from "@/features/users/utils/validation";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordMutation = useResetPassword();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        const passwordCheck = validatePassword(newPassword);
        if (!passwordCheck.isValid) {
            toast.error(passwordCheck.message);
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        resetPasswordMutation.mutate({ email, newPassword });
    };

    const fields: FormFieldConfig[] = [
        {
            id: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Your Email",
            value: email,
            onChange: setEmail,
            required: true,
            icon: Mail,
            colSpan: 2,
        },
        {
            id: "newPassword",
            label: "New Password",
            type: "password",
            placeholder: "New Password",
            value: newPassword,
            onChange: setNewPassword,
            required: true,
            icon: Lock,
            colSpan: 2,
        },
        {
            id: "confirmPassword",
            label: "Confirm New Password",
            type: "password",
            placeholder: "Confirm New Password",
            value: confirmPassword,
            onChange: setConfirmPassword,
            required: true,
            icon: Lock,
            colSpan: 2,
        },
    ];

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Reset Password"
            isLoading={resetPasswordMutation.isPending}
            className="space-y-4"
            submitButtonClassName="w-full bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20"
        />
    );
};

export default ForgotPasswordForm;
