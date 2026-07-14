import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { useCenters } from "@/features/centers/hooks/useCenters";
import { CenterList } from "@/features/centers/components/CenterList";
import { useEffect, useState } from "react";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { Center } from "@/features/centers/types/center";

const Centers = () => {
  const navigate = useNavigate();
  const { centers, isLoading, fetchCenters, deleteCenter, isProcessing } = useCenters();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [centerToDelete, setCenterToDelete] = useState<Center | null>(null);

  useEffect(() => {
    fetchCenters();
  }, [fetchCenters]);

  const handleEdit = (center: Center) => {
    navigate(ROUTES.CENTERS_EDIT.replace(":centerId", center.id), { state: { center } });
  };

  const handleDeleteClick = (center: Center) => {
    setCenterToDelete(center);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (centerToDelete) {
      const success = await deleteCenter(centerToDelete.id);
      if (success) {
        setDeleteDialogOpen(false);
        setCenterToDelete(null);
      }
    }
  };

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
          <CenterList
            centers={centers}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Center"
        itemName={centerToDelete?.name}
        isLoading={isProcessing}
      />
    </DashboardLayout>
  );
};

export default Centers;
