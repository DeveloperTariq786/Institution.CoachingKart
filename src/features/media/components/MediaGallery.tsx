import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Images, Loader2, Pencil, Trash2 } from "lucide-react";
import { GalleryImage } from "../types";

interface MediaGalleryProps {
    gallery: GalleryImage[];
    onEdit: (image: GalleryImage) => void;
    onRemove: (image: GalleryImage) => void;
    isLoading?: boolean;
}

const MediaGallery = ({ gallery, onEdit, onRemove, isLoading }: MediaGalleryProps) => {
    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted-foreground">Loading gallery...</span>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Images className="h-5 w-5 text-primary" />
                    Photo Gallery
                </CardTitle>
                <CardDescription>
                    Your institution's gallery images
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {gallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gallery.map((image) => (
                            <div key={image.id} className="relative group">
                                <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                                    <img
                                        src={image.image}
                                        alt={image.tag}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="absolute top-2 left-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="icon"
                                        onClick={() => onEdit(image)}
                                        className="h-7 w-7 bg-white/95 hover:bg-white shadow-sm border border-slate-100 backdrop-blur-sm"
                                    >
                                        <Pencil className="h-3.5 w-3.5 text-slate-600" />
                                    </Button>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => onRemove(image)}
                                        className="h-7 w-7 p-0 shadow-sm border border-red-100"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                                <div className="mt-2 px-1">
                                    <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        {image.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <Images className="h-12 w-12 mb-3 opacity-30" />
                        <p className="text-sm">No gallery images yet.</p>
                        <p className="text-xs mt-1">Click "Add Gallery Images" to get started.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MediaGallery;
