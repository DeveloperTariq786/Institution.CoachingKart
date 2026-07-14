import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Users2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { DataTable, Column } from "@/components/common/DataTable";
import { useFaculty } from "@/features/faculty/hooks/useFaculty";
import { Faculty as FacultyType } from "@/features/faculty/types/faculty";

const Faculty = () => {
  const navigate = useNavigate();
  const { faculty, isLoading, fetchFaculty, deleteFaculty, isProcessing, hasLoaded } = useFaculty();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<FacultyType | null>(null);

  useEffect(() => {
    fetchFaculty();
  }, [fetchFaculty]);

  const handleDeleteClick = (f: FacultyType) => {
    setFacultyToDelete(f);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (facultyToDelete) {
      const success = await deleteFaculty(facultyToDelete.id);
      if (success) {
        setDeleteDialogOpen(false);
        setFacultyToDelete(null);
      }
    }
  };

  const columns: Column<FacultyType>[] = [
    {
      header: "Name",
      className: "w-[250px]",
      cell: (f) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
            {f.profileImage ? (
              <img src={f.profileImage} alt={f.name} className="w-full h-full object-cover" />
            ) : (
              <Users2 className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-700 leading-none">{f.name}</p>
            <p className="text-xs text-slate-500 mt-1">{f.tag}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Specialization",
      cell: (f) => (
        <div className="flex flex-wrap gap-1">
          {f.subject ? (
            <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
              {f.subject.name}
            </span>
          ) : (
            <span className="text-sm text-slate-400">No subject</span>
          )}
        </div>
      ),
    },
    {
      header: "Experience",
      cell: (f) => (
        <span className="text-sm text-slate-600 font-medium">
          {f.experience}
        </span>
      ),
    },
    {
      header: "Lectures",
      cell: (f) => (
        <span className="text-sm font-medium text-slate-600 bg-blue-50/50 text-blue-600 border border-blue-100 px-2 py-1 rounded-full">
          {f._count?.lectures || 0} Lectures
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right w-[150px]",
      cell: (f) => (
        <div className="flex justify-end gap-2 text-right">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-slate-100"
            onClick={() => navigate(ROUTES.FACULTY_EDIT.replace(":facultyId", f.id), { state: { faculty: f } })}
          >
            <Pencil className="h-4 w-4 text-slate-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleDeleteClick(f)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Faculty</h1>
            <p className="text-slate-500 mt-1">
              Register and manage teaching staff and their profiles.
            </p>
          </div>
          <Button asChild className="shadow-sm">
            <Link to={ROUTES.FACULTY_ADD}>
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty Member
            </Link>
          </Button>
        </div>

        {/* Faculty Table */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={faculty}
              isLoading={isLoading || !hasLoaded}
            />
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Faculty Member"
        itemName={facultyToDelete?.name}
        isLoading={isProcessing}
      />
    </DashboardLayout>
  );
};

export default Faculty;
