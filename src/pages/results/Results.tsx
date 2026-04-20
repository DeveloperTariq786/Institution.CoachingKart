import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, RefreshCcw } from "lucide-react";
import ResultsTable from "@/features/results/components/ResultsTable";
import { useResults } from "@/features/results/hooks/useResults";

const Results = () => {
  const { results, isLoading, fetchResults } = useResults();

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Results</h1>
            <p className="text-muted-foreground mt-1 text-base">
              Manage student results and grades
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
            <ResultsTable results={results} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Results;

