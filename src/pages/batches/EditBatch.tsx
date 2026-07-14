import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { EditBatchForm } from "@/features/batches/components/EditBatchForm";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { Batch } from "@/features/batches/types/batch";
import { useInstitutionProfile } from "@/features/Institution/hooks/useInstitutionProfile";
import { ROUTES } from "@/core/routes/paths";
import { Loader2 } from "lucide-react";

const EditBatch = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const { batches, fetchBatches, isLoading } = useBatches();
  const { profile } = useInstitutionProfile();
  const [batch, setBatch] = useState<Batch | null>(null);

  const institutionId = profile?.id;

  // Fetch all batches for the institution so we can find the one to edit
  useEffect(() => {
    if (institutionId) {
      fetchBatches({ institutionId }, 1, 100);
    }
  }, [institutionId, fetchBatches]);

  // Find the batch by ID once batches are loaded
  useEffect(() => {
    if (batches.length > 0 && batchId) {
      const found = batches.find((b) => b.id === batchId);
      if (found) {
        setBatch(found);
      } else {
        navigate(ROUTES.BATCHES);
      }
    }
  }, [batches, batchId, navigate]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Edit Batch</h1>
          <p className="text-muted-foreground mt-1">
            Update the batch details, fee, and subjects
          </p>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {isLoading || !batch ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <EditBatchForm batch={batch} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditBatch;
