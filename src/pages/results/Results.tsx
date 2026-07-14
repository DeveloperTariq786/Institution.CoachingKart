import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import ResultsTable from "@/features/results/components/ResultsTable";
import { useResults } from "@/features/results/hooks/useResults";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { Result } from "@/features/results/types";

const Results = () => {
  const navigate = useNavigate();
  const { results, isLoading, fetchResults, deleteResult, isProcessing } = useResults();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resultToDelete, setResultToDelete] = useState<Result | null>(null);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleEdit = (result: Result) => {
    navigate(ROUTES.RESULTS_EDIT.replace(":resultId", result.id), { state: { result } });
  };

  const handleDeleteClick = (result: Result) => {
    setResultToDelete(result);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (resultToDelete) {
      const success = await deleteResult(resultToDelete.id);
      if (success) {
        setDeleteDialogOpen(false);
        setResultToDelete(null);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Results</h1>
            <p className="text-muted-foreground mt-1 text-base">
              Manage student results and achievements
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => fetchResults()}
              disabled={isLoading}
              className="h-9 w-9"
              title="Refresh Results"
            >
              <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button asChild className="h-9">
              <Link to={ROUTES.RESULTS_ADD}>
                <Plus className="h-4 w-4 mr-2" />
                Add Result
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <ResultsTable 
              results={results} 
              isLoading={isLoading} 
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Student Achievement"
        itemName={resultToDelete ? `${resultToDelete.studentName} - Rank ${resultToDelete.rank}` : undefined}
        isLoading={isProcessing}
      />
    </DashboardLayout>
  );
};

export default Results;

