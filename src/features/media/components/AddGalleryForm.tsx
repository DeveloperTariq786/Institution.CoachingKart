import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { useGallery } from "../hooks/useGallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Tag, UploadCloud } from "lucide-react";

interface GalleryEntry {
    tag: string;
    file: File | null;
    preview: string;
}

export const AddGalleryForm = () => {
    const navigate = useNavigate();
    const { addGalleryItems, isAdding } = useGallery();

    const [entries, setEntries] = useState<GalleryEntry[]>([
        { tag: "", file: null, preview: "" }
    ]);

    const addEntry = () => {
        setEntries([...entries, { tag: "", file: null, preview: "" }]);
    };

    const removeEntry = (index: number) => {
        if (entries.length > 1) {
            setEntries(entries.filter((_, i) => i !== index));
        }
    };

    const updateTag = (index: number, tag: string) => {
        const newEntries = [...entries];
        newEntries[index].tag = tag;
        setEntries(newEntries);
    };

    const handleFileChange = (index: number, file: File | null) => {
        const newEntries = [...entries];
        if (file) {
            newEntries[index].file = file;
            newEntries[index].preview = URL.createObjectURL(file);
        } else {
            newEntries[index].file = null;
            newEntries[index].preview = "";
        }
        setEntries(newEntries);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validEntries = entries.filter(e => e.file !== null);
        if (validEntries.length === 0) {
            return;
        }

        const items = validEntries.map(entry => ({
            tag: entry.tag,
            file: entry.file as File,
        }));

        try {
            await addGalleryItems({ items });
            navigate(`${ROUTES.MEDIA}?tab=gallery`);
        } catch {
            // Error is handled by the hook
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Add Gallery Images</h1>
                    <p className="text-muted-foreground">Upload images with tags for your institution gallery.</p>
                </div>
                <Button onClick={addEntry} variant="outline" className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                    <Plus className="h-4 w-4" />
                    Add More
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {entries.map((entry, index) => (
                        <Card key={index} className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image Upload Section */}
                                    <div className="flex-shrink-0">
                                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Image</Label>
                                        <div className="relative group/photo">
                                            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border group-hover:border-primary/50 transition-colors bg-muted/30 flex flex-col items-center justify-center overflow-hidden">
                                                {entry.preview ? (
                                                    <img src={entry.preview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                                        <UploadCloud className="h-8 w-8 opacity-40" />
                                                        <span className="text-[10px] text-center px-2">Upload image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                                                required
                                            />
                                            {entry.preview && (
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                                    <span className="text-white text-xs font-medium">Change Image</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tag Field Section */}
                                    <div className="flex-grow flex flex-col justify-center gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-slate-600">Tag</Label>
                                            <div className="relative">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    className="pl-10"
                                                    placeholder="e.g. Classroom, Lab, Library"
                                                    value={entry.tag}
                                                    onChange={(e) => updateTag(index, e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <div className="flex items-center justify-end">
                                        {entries.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:bg-destructive/10 h-10 w-10"
                                                onClick={() => removeEntry(index)}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="ghost" onClick={() => navigate(`${ROUTES.MEDIA}?tab=gallery`)} disabled={isAdding}>
                        Back
                    </Button>
                    <Button type="submit" className="min-w-[150px] shadow-lg shadow-primary/20" disabled={isAdding}>
                        {isAdding ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Uploading {entries.length} Image(s)...
                            </div>
                        ) : (
                            `Upload ${entries.length} Image(s)`
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};
