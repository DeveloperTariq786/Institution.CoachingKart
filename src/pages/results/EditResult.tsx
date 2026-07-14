import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditResultForm } from "@/features/results/components/EditResultForm";
import { useResults } from "@/features/results/hooks/useResults";
import { Result } from "@/features/results/types";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditResult = () => {
    const { resultId } = useParams<{ resultId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { results, fetchResults, isLoading } = useResults();
    const [result, setResult] = useState<Result | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (location.state?.result) {
            setResult(location.state.result);
            return;
        }

        if (results && results.length > 0 && resultId) {
            const found = results.find((r) => r.id === resultId);
            if (found) {
                setResult(found);
            } else {
                navigate(ROUTES.RESULTS);
            }
        } else if (resultId && !hasLoaded && !isLoading) {
            fetchResults().then(() => setHasLoaded(true));
        } else if (resultId && hasLoaded) {
            navigate(ROUTES.RESULTS);
        }
    }, [results, resultId, navigate, location.state, fetchResults, hasLoaded, isLoading]);

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Edit Student Achievement</h1>
                    <p className="text-muted-foreground mt-1">
                        Update student ranks, scores, session years, specialization courses, or student profiles.
                    </p>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8 md:p-12">
                        {!result ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <EditResultForm result={result} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default EditResult;
