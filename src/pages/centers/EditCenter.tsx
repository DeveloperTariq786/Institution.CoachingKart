import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditCenterForm } from "@/features/centers/components/EditCenterForm";
import { useCenters } from "@/features/centers/hooks/useCenters";
import { Center } from "@/features/centers/types/center";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditCenter = () => {
    const { centerId } = useParams<{ centerId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { centers, fetchCenters, hasLoaded } = useCenters();
    const [center, setCenter] = useState<Center | null>(null);

    useEffect(() => {
        if (location.state?.center) {
            setCenter(location.state.center);
            return;
        }

        if (centers && centers.length > 0 && centerId) {
            const found = centers.find((c) => c.id === centerId);
            if (found) {
                setCenter(found);
            } else {
                navigate(ROUTES.CENTERS);
            }
        } else if (centerId && !hasLoaded) {
            fetchCenters();
        } else if (centerId) {
            navigate(ROUTES.CENTERS);
        }
    }, [centers, centerId, navigate, location.state, fetchCenters, hasLoaded]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Edit Center</h1>
                    <p className="text-muted-foreground mt-1">
                        Update the center's name, phone, image, address, or coordinate discovery
                    </p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {!center ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <EditCenterForm center={center} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditCenter;
