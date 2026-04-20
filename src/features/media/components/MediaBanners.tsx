import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, LayoutTemplate, Loader2 } from "lucide-react";
import { BannerImage } from "../types";

interface MediaBannersProps {
    banners: BannerImage[];
    onRemove: (id: string) => void;
    isLoading?: boolean;
}

const MediaBanners = ({ banners, onRemove, isLoading }: MediaBannersProps) => {
    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted-foreground">Loading banners...</span>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LayoutTemplate className="h-5 w-5 text-primary" />
                    Banner Images
                </CardTitle>
                <CardDescription>
                    Your institution's banners
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {banners.length > 0 ? (
                    <div className="space-y-4">
                        {banners.map((banner, index) => (
                            <div
                                key={banner.id}
                                className="relative border rounded-lg overflow-hidden bg-muted/30"
                            >
                                <div className="relative aspect-[4/1] w-full overflow-hidden">
                                    <img
                                        src={banner.image}
                                        alt={banner.heading || `Banner ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onRemove(banner.id)}
                                        className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-sm">{banner.heading}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{banner.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <LayoutTemplate className="h-12 w-12 mb-3 opacity-30" />
                        <p className="text-sm">No banners yet.</p>
                        <p className="text-xs mt-1">Click "Add Banners" to get started.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MediaBanners;
