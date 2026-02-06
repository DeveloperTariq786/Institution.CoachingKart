import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export interface GalleryImage {
    id: string;
    url: string;
    caption: string;
}

interface MediaGalleryProps {
    gallery: GalleryImage[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (id: string) => void;
    onUpdateCaption: (id: string, caption: string) => void;
}

const MediaGallery = ({ gallery, onUpload, onRemove, onUpdateCaption }: MediaGalleryProps) => {
    const galleryInputRef = useRef<HTMLInputElement>(null);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Images className="h-5 w-5 text-primary" />
                    Photo Gallery
                </CardTitle>
                <CardDescription>
                    Upload images of your institution, classrooms, facilities, and events
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Gallery Grid */}
                {gallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gallery.map((image) => (
                            <div key={image.id} className="relative group">
                                <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                                    <img
                                        src={image.url}
                                        alt={image.caption}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onRemove(image.id)}
                                    className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                                <Input
                                    value={image.caption}
                                    onChange={(e) => onUpdateCaption(image.id, e.target.value)}
                                    placeholder="Caption..."
                                    className="mt-2 h-8 text-sm"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload Button */}
                <label className={cn(
                    "flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                    gallery.length === 0 ? "py-12" : "py-6"
                )}>
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                        {gallery.length === 0 ? "Click to upload gallery images" : "Add more images"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">You can select multiple images</span>
                    <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onUpload}
                        className="hidden"
                    />
                </label>
            </CardContent>
        </Card>
    );
};

export default MediaGallery;
