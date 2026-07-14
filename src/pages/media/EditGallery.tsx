import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditGalleryForm } from "@/features/media/components/EditGalleryForm";
import { useGallery } from "@/features/media/hooks/useGallery";
import { GalleryImage } from "@/features/media/types";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditGallery = () => {
    const { galleryId } = useParams<{ galleryId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { gallery, isLoading } = useGallery();
    const [galleryItem, setGalleryItem] = useState<GalleryImage | null>(null);

    useEffect(() => {
        if (location.state?.galleryItem) {
            setGalleryItem(location.state.galleryItem);
            return;
        }

        if (gallery && gallery.length > 0 && galleryId) {
            const found = gallery.find((item) => item.id === galleryId);
            if (found) {
                setGalleryItem(found);
            } else {
                navigate(`${ROUTES.MEDIA}?tab=gallery`);
            }
        } else if (galleryId && !isLoading) {
            if (gallery && gallery.length > 0) {
                navigate(`${ROUTES.MEDIA}?tab=gallery`);
            }
        }
    }, [gallery, galleryId, navigate, location.state, isLoading]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Edit Gallery Item</h1>
                    <p className="text-muted-foreground mt-1">
                        Update the tag or upload a new image for the gallery item.
                    </p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {!galleryItem ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <EditGalleryForm galleryItem={galleryItem} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditGallery;
