import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { cn } from "@/lib/utils";

interface LandingButtonProps {
    text: string;
    className?: string;
    showIcon?: boolean;
    to?: string;
    onClick?: () => void;
    variant?: 'primary' | 'sky' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const LandingButton = ({
    text,
    className,
    showIcon = true,
    to = ROUTES.ONBOARDING,
    onClick,
    variant = 'primary',
    size = 'md',
    rounded = 'full'
}: LandingButtonProps) => {
    const variants = {
        primary: "bg-[#0f172a] text-white hover:bg-slate-800 shadow-slate-900/20",
        sky: "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/20",
        outline: "border-2 border-slate-200 bg-transparent text-slate-900 hover:bg-slate-50 shadow-none",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 shadow-none"
    };

    const sizes = {
        sm: "px-5 py-2 text-sm gap-2",
        md: "px-7 py-3 text-base gap-3",
        lg: "px-9 py-4 text-lg gap-3"
    };

    const rounding = {
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        full: "rounded-full"
    };

    const content = (
        <>
            {text}
            {showIcon && <ArrowUpRight className={cn(
                "transition-transform group-hover:translate-x-1 group-hover:-translate-y-1",
                size === 'sm' ? "h-4 w-4" : "h-5 w-5"
            )} />}
        </>
    );

    const baseClasses = cn(
        "group flex items-center font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl justify-center shrink-0",
        variants[variant],
        sizes[size],
        rounding[rounded],
        className
    );

    if (onClick) {
        return (
            <button onClick={onClick} className={baseClasses}>
                {content}
            </button>
        );
    }

    return (
        <Link to={to} className={baseClasses}>
            {content}
        </Link>
    );
};

export default LandingButton;
