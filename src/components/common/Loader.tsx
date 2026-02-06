import { cn } from "@/lib/utils";

interface LoaderProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    text?: string;
    fullPage?: boolean;
}

const Loader = ({
    className,
    size = "md",
    text,
    fullPage = false,
}: LoaderProps) => {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-2",
        lg: "h-12 w-12 border-4",
        xl: "h-16 w-16 border-4",
    };

    const loaderContent = (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
            <div
                className={cn(
                    "animate-spin rounded-full border-solid border-primary border-t-transparent",
                    sizeClasses[size]
                )}
            />
            {text && (
                <p className="text-sm font-medium text-slate-500 tracking-tight">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
                {loaderContent}
            </div>
        );
    }

    return loaderContent;
};

export default Loader;
