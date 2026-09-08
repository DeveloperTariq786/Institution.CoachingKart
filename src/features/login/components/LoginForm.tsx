import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import CommonForm, { FormFieldConfig } from "@/components/common/CommonForm";
import { useLogin } from "@/features/login/hooks/useLogin";
import { ROUTES } from "@/core/routes/paths";

interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useLogin({ onSuccess });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }

        loginMutation.mutate({ email, password });
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
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Your Password",
            value: password,
            onChange: setPassword,
            required: true,
            icon: Lock,
            colSpan: 2,
        },
    ];

    return (
        <CommonForm
            fields={fields}
            onSubmit={handleLogin}
            submitButtonText="Sign In"
            isLoading={loginMutation.isPending}
            className="space-y-5"
            submitButtonClassName="w-full bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20"
        >
            <div className="flex justify-end -mt-4">
                <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
                >
                    Forgot password?
                </Link>
            </div>
        </CommonForm>
    );
};

export default LoginForm;
