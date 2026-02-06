import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface FormFieldConfig {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string | any) => void;
    required?: boolean;
    icon?: LucideIcon;
    componentType?: 'input' | 'textarea' | 'select' | 'custom';
    options?: string[];
    customComponent?: ReactNode;
    className?: string;
    error?: string;
    minLength?: number;
    colSpan?: 1 | 2;
}

interface CommonFormProps {
    fields: FormFieldConfig[];
    onSubmit: (e: React.FormEvent) => void;
    submitButtonText: string;
    isSubmitDisabled?: boolean;
    isLoading?: boolean;
    submitButtonIcon?: LucideIcon;
    onBack?: () => void;
    backButtonText?: string;
    headerIcon?: LucideIcon;
    stepIndicator?: string;
    title?: string;
    description?: string;
    children?: ReactNode;
    className?: string;
    submitButtonClassName?: string;
}

const FormInput = ({ field }: { field: FormFieldConfig }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = field.type === 'password';

    return (
        <>
            <Input
                id={field.id}
                type={isPassword && showPassword ? "text" : (field.type || 'text')}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required={field.required}
                minLength={field.minLength}
                className={cn(
                    "h-10 text-sm focus-visible:ring-primary/20 transition-all",
                    field.icon ? "pl-11" : "",
                    isPassword ? "pr-12" : "",
                    field.className
                )}
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors focus:outline-none"
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            )}
        </>
    );
};

const CommonForm = ({
    fields,
    onSubmit,
    submitButtonText,
    isSubmitDisabled,
    isLoading,
    submitButtonIcon: SubmitIcon,
    onBack,
    backButtonText = "Back",
    headerIcon: HeaderIcon,
    stepIndicator,
    title,
    description,
    children,
    className,
    submitButtonClassName,
}: CommonFormProps) => {

    return (
        <form onSubmit={onSubmit} className={cn("space-y-8", className)}>
            {/* Header */}
            {(title || stepIndicator || description) && (
                <div className="space-y-3">
                    {stepIndicator && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            {HeaderIcon && <HeaderIcon className="h-4 w-4" />}
                            {stepIndicator}
                        </div>
                    )}
                    {title && (
                        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-lg text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-1">
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className={cn(
                            "space-y-1.5",
                            field.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"
                        )}
                    >
                        <Label htmlFor={field.id} className="text-[13px] font-semibold text-slate-600 ml-0.5">
                            {field.label}
                        </Label>
                        <div className="relative">
                            {field.icon && field.componentType !== 'textarea' && (
                                <field.icon className={cn(
                                    "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70",
                                    field.componentType === 'select' ? "z-10 pointer-events-none" : ""
                                )} />
                            )}
                            {field.icon && field.componentType === 'textarea' && (
                                <field.icon className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground/70" />
                            )}

                            {field.componentType === 'textarea' ? (
                                <Textarea
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    required={field.required}
                                    className={cn("min-h-[100px] resize-none pl-11 pt-3 text-sm focus-visible:ring-primary/20", field.className)}
                                />
                            ) : field.componentType === 'select' ? (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    required={field.required}
                                >
                                    <SelectTrigger className={cn("h-10 pl-11 text-sm focus-visible:ring-primary/20", field.className)}>
                                        <SelectValue placeholder={field.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map((option) => (
                                            <SelectItem key={option} value={option} className="text-sm">
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : field.componentType === 'custom' ? (
                                field.customComponent
                            ) : (
                                <FormInput field={field} />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {children}

            {/* Navigation Buttons */}
            <div className={cn("flex items-center pt-4", onBack ? "justify-between" : "justify-end")}>
                {onBack && (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onBack}
                        className="gap-2 text-base hover:bg-muted"
                    >
                        {backButtonText}
                    </Button>
                )}
                <Button
                    type="submit"
                    size="default"
                    className={cn(
                        "h-10 gap-2 px-6 text-sm font-semibold shadow-md transition-all active:scale-[0.98]",
                        !submitButtonClassName && "bg-primary hover:bg-primary/90 shadow-primary/20",
                        submitButtonClassName
                    )}
                    disabled={isSubmitDisabled || isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                        </div>
                    ) : (
                        <>
                            {submitButtonText}
                            {SubmitIcon && <SubmitIcon className="h-5 w-5" />}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CommonForm;
