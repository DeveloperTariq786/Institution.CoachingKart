import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value: string | File;
    onChange: (value: File | string) => void;
    onRemove: () => void;
    label: string;
    description?: string;
    aspectRatio?: "square" | "video";
    className?: string;
}

const ImageUpload = ({
    value,
    onChange,
    onRemove,
    label,
    description,
    aspectRatio = "square",
    className,
}: ImageUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const displayUrl = typeof value === "string" ? value : value ? URL.createObjectURL(value) : "";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex items-start gap-4">
                {displayUrl ? (
                    <div className="relative">
                        <div
                            className={cn(
                                "overflow-hidden rounded-lg border bg-muted flex items-center justify-center",
                                aspectRatio === "square" ? "h-32 w-32" : "aspect-[3/1] w-full"
                            )}
                        >
                            <img
                                src={displayUrl}
                                alt={label}
                                className={cn(
                                    "h-full w-full",
                                    aspectRatio === "square" ? "object-contain" : "object-cover"
                                )}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={onRemove}
                            className="absolute -top-2 -right-2 h-7 w-7 p-0 rounded-full shadow-md"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <label className={cn(
                        "flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors bg-background",
                        aspectRatio === "square" ? "h-32 w-32" : "aspect-[3/1] w-full"
                    )}>
                        <ImagePlus className={cn("text-muted-foreground mb-1.5 opacity-60", aspectRatio === "square" ? "h-7 w-7" : "h-8 w-8")} />
                        <span className="text-[11px] font-medium text-muted-foreground/80 text-center px-2 uppercase tracking-tight">{label}</span>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                )}
                {aspectRatio === "square" && description && (
                    <div className="flex-1 text-[13px] text-muted-foreground/70 pt-1 leading-relaxed">
                        <p>{description}</p>
                    </div>
                )}
            </div>
            {aspectRatio === "video" && description && (
                <p className="text-[13px] text-muted-foreground/70 mt-1 leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
