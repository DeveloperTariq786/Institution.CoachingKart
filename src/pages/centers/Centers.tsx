import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { useCenters } from "@/features/centers/hooks/useCenters";
import { CenterList } from "@/features/centers/components/CenterList";
import { useEffect } from "react";

const Centers = () => {
  const { centers, isLoading, fetchCenters } = useCenters();

  useEffect(() => {
    fetchCenters();
  }, [fetchCenters]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Centers</h1>
            <p className="text-slate-500 mt-1">
              Manage your institution's physical locations and branches.
            </p>
          </div>
          <Button className="shadow-sm" asChild>
            <Link to={ROUTES.CENTERS_ADD}>
              <Plus className="h-4 w-4 mr-2" />
              Add Center
            </Link>
          </Button>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          <CenterList centers={centers} isLoading={isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Centers;
