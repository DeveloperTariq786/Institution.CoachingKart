import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, X, LayoutTemplate, GripVertical, Trash2, Plus } from "lucide-react";

export interface BannerItem {
    id: string;
    image: string;
    heading: string;
    description: string;
}

interface MediaBannersProps {
    banners: BannerItem[];
    onImageUpload: (bannerId: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, field: keyof BannerItem, value: string) => void;
}

const MediaBanners = ({ banners, onImageUpload, onAdd, onRemove, onUpdate }: MediaBannersProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LayoutTemplate className="h-5 w-5 text-primary" />
                    Banner Images
                </CardTitle>
                <CardDescription>
                    Add scrollable banner images with headings and descriptions
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className="relative border rounded-lg p-4 space-y-4 bg-muted/30"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <GripVertical className="h-4 w-4" />
                                Banner {index + 1}
                            </div>
                            {banners.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemove(banner.id)}
                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {/* Banner Image Upload */}
                        <div className="space-y-2">
                            <Label>Banner Image</Label>
                            {banner.image ? (
                                <div className="relative aspect-[4/1] w-full overflow-hidden rounded-lg border">
                                    <img
                                        src={banner.image}
                                        alt={`Banner ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onUpdate(banner.id, 'image', '')}
                                        className="absolute top-2 right-2 h-8 w-8 p-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center aspect-[4/1] w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                    <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                                    <span className="text-sm text-muted-foreground">Click to upload banner image</span>
                                    <span className="text-xs text-muted-foreground mt-1">Recommended: 1920x800px</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => onImageUpload(banner.id, e)}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Banner Heading & Description */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Heading</Label>
                                <Input
                                    value={banner.heading}
                                    onChange={(e) => onUpdate(banner.id, 'heading', e.target.value)}
                                    placeholder="Banner heading..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Input
                                    value={banner.description}
                                    onChange={(e) => onUpdate(banner.id, 'description', e.target.value)}
                                    placeholder="Short description..."
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    onClick={onAdd}
                    className="w-full gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Another Banner
                </Button>
            </CardContent>
        </Card>
    );
};

export default MediaBanners;
