import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/core/routes/paths";
import ForgotPasswordForm from "@/features/login/components/ForgotPasswordForm";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-4 relative overflow-hidden">
            <Link
                to={ROUTES.LOGIN}
                className="absolute left-6 top-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm z-20"
            >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Sign In</span>
            </Link>

            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
                <Card className="border-slate-200 bg-white shadow-2xl glass-card px-2 py-2">
                    <CardHeader className="space-y-1 flex flex-col items-center pb-2">
                        <img
                            src="/assets/icon-logo.png"
                            alt="Logo"
                            className="h-20 w-20 object-contain z-10"
                        />
                        <CardTitle className="text-xl font-bold text-center text-slate-900">Reset Password</CardTitle>
                        <CardDescription className="text-center text-slate-500 text-sm">
                            Enter your email and new password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                        <ForgotPasswordForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;
