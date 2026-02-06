import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/core/routes/paths";
import { toast } from "sonner";

import LoginForm from "@/features/login/components/LoginForm";

import { ArrowLeft } from "lucide-react";

const Login = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
            {/* Back Button */}
            <Link
                to={ROUTES.LANDING}
                className="absolute left-6 top-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm z-20"
            >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
            </Link>

            {/* Subtle Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-8">
                    <Link to={ROUTES.LANDING} className="flex flex-col items-center gap-4">
                        <span className="text-3xl font-black tracking-tight text-slate-900">Coaching<span className="text-sky-600">Kart</span></span>
                    </Link>
                </div>

                <Card className="border-slate-200 bg-white shadow-2xl glass-card px-2 py-4">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-slate-900">Welcome Back</CardTitle>
                        <CardDescription className="text-center text-slate-500">
                            Please enter your creddenatils to Sign In
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <LoginForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
