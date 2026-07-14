import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditBannerForm } from "@/features/media/components/EditBannerForm";
import { useBanner } from "@/features/media/hooks/useBanner";
import { BannerImage } from "@/features/media/types";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditBanner = () => {
    const { bannerId } = useParams<{ bannerId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { banners, isLoading } = useBanner();
    const [banner, setBanner] = useState<BannerImage | null>(null);

    useEffect(() => {
        if (location.state?.bannerItem) {
            setBanner(location.state.bannerItem);
            return;
        }

        if (banners && banners.length > 0 && bannerId) {
            const found = banners.find((b) => b.id === bannerId);
            if (found) {
                setBanner(found);
            } else {
                navigate(`${ROUTES.MEDIA}?tab=banners`);
            }
        } else if (bannerId && !isLoading) {
            if (banners && banners.length > 0) {
                navigate(`${ROUTES.MEDIA}?tab=banners`);
            }
        }
    }, [banners, bannerId, navigate, location.state, isLoading]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Edit Banner Item</h1>
                    <p className="text-muted-foreground mt-1">
                        Update the heading, description, or upload a new image for the banner.
                    </p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {!banner ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <EditBannerForm banner={banner} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditBanner;
