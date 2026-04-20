import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Eye, Target, Upload, Image as ImageIcon } from "lucide-react";
import { UpdateAboutRequest } from "../types";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AboutProps {
    data: UpdateAboutRequest;
    onChange: (data: Partial<UpdateAboutRequest>) => void;
}

const About = ({ data, onChange }: AboutProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Update preview when data.image changes (if it's a URL or if it becomes a File)
    useEffect(() => {
        if (typeof data.image === "string") {
            setPreviewUrl(data.image);
        } else if (data.image instanceof File) {
            const url = URL.createObjectURL(data.image);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [data.image]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange({ image: file });
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* General Information Section */}
            <Card className="overflow-hidden border shadow-sm">
                <CardHeader className="bg-muted/30 border-b pb-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                            <CardTitle className="text-lg">General Information</CardTitle>
                            <CardDescription>Main content of your institution's about page</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-sm font-medium">About Page Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Transforming Education Through Excellence"
                                value={data.title}
                                onChange={(e) => onChange({ title: e.target.value })}
                            />
                        </div>
                        
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Feature Image</Label>
                            <div className="flex items-center gap-4">
                                <div className="relative w-24 h-16 rounded-md border bg-muted overflow-hidden flex items-center justify-center group flex-shrink-0">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                    )}
                                    <div 
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-9 gap-2"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload className="h-4 w-4" />
                                        Upload Image
                                    </Button>
                                    <p className="text-[10px] text-muted-foreground">JPG, PNG or WEBP. Max 2MB recommended.</p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-sm font-medium">Institution Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your institution's history, values, and community..."
                            value={data.description}
                            onChange={(e) => onChange({ description: e.target.value })}
                            className="min-h-[180px] leading-relaxed"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Vision Section */}
                <Card className="border shadow-sm">
                    <CardHeader className="bg-blue-50/20 border-b pb-4">
                        <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-blue-500" />
                            <CardTitle className="text-base">{data.visionTitle || "Our Vision"}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid gap-2">
                            <Label htmlFor="visionContent" className="text-xs text-muted-foreground font-semibold">Vision Statement</Label>
                            <Textarea
                                id="visionContent"
                                placeholder="Empowering the next generation..."
                                value={data.visionContent}
                                onChange={(e) => onChange({ visionContent: e.target.value })}
                                className="min-h-[120px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Mission Section */}
                <Card className="border shadow-sm">
                    <CardHeader className="bg-purple-50/20 border-b pb-4">
                        <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-purple-500" />
                            <CardTitle className="text-base">{data.missionTitle || "Our Mission"}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid gap-2">
                            <Label htmlFor="missionContent" className="text-xs text-muted-foreground font-semibold">Mission Statement</Label>
                            <Textarea
                                id="missionContent"
                                placeholder="To provide accessible, inclusive education..."
                                value={data.missionContent}
                                onChange={(e) => onChange({ missionContent: e.target.value })}
                                className="min-h-[120px]"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default About;
