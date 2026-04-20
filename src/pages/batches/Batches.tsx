import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, School, BookOpen, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { DataTable, Column } from "@/components/common/DataTable";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { Batch } from "@/features/batches/types/batch";
import { BatchRowInfo } from "@/features/batches/components/BatchRowInfo";
import { usePrograms } from "@/features/programs/hooks/usePrograms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useInstitutionProfile } from "@/features/Institution/hooks/useInstitutionProfile";

const Batches = () => {
  const { batches, pagination, isLoading: isBatchesLoading, fetchBatches, deleteBatch, hasLoaded: hasBatchesLoaded } = useBatches();
  const { programs, isLoading: isProgramsLoading, fetchPrograms } = usePrograms();
  const { profile, isLoading: isProfileLoading } = useInstitutionProfile();

  const [selectedProgramId, setSelectedProgramId] = useState<string>("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState<Batch | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const institutionId = profile?.id;

  // Fetch all programs for the institution once profile is loaded
  useEffect(() => {
    if (institutionId) {
      fetchPrograms({ institutionId });
    }
  }, [institutionId, fetchPrograms]);

  // Handle program selection (default to all)
  useEffect(() => {
    if (programs.length > 0 && !selectedProgramId) {
      setSelectedProgramId("all");
    }
  }, [programs, selectedProgramId]);

  // Fetch batches when program selection or institutionId changes
  useEffect(() => {
    if (selectedProgramId === "all" && institutionId) {
      fetchBatches({ institutionId }, currentPage, 10);
    } else if (selectedProgramId && selectedProgramId !== "all") {
      fetchBatches({ programId: selectedProgramId }, currentPage, 10);
    }
  }, [selectedProgramId, fetchBatches, institutionId, currentPage]);

  const handleDeleteClick = (batch: Batch) => {
    setBatchToDelete(batch);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (batchToDelete) {
      await deleteBatch(batchToDelete.id);
      setBatchToDelete(null);
    }
  };

  const columns: Column<Batch>[] = [
    {
      header: "Name",
      className: "w-[300px] max-w-[300px] overflow-hidden",
      cell: (batch) => (
        <BatchRowInfo name={batch.name} />
      ),
    },
    {
      header: "Session",
      cell: (batch) => (
        <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
          {batch.session}
        </span>
      ),
    },
    {
      header: "Program",
      cell: (batch) => (
        <span className="text-sm text-slate-500">
          {batch.program?.name || "N/A"}
        </span>
      ),
    },
    {
      header: "Subjects",
      className: "max-w-[200px]",
      cell: (batch) => (
        <div className="flex flex-wrap gap-1">
          {batch.subjects && batch.subjects.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {batch.subjects.slice(0, 2).map((sb) => (
                <Tooltip key={sb.batchSubjectId}>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {sb.subject.name}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sb.subject.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              {batch.subjects.length > 2 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      +{batch.subjects.length - 2} more
                    </Badge>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3" align="start" onClick={(e) => e.stopPropagation()}>
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">All Subjects</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {batch.subjects.map((sb) => (
                          <Badge key={sb.batchSubjectId} variant="secondary" className="text-[10px] px-2 py-0.5">
                            {sb.subject.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ) : (
            <span className="text-xs text-slate-400 italic">No subjects</span>
          )}
        </div>
      ),
    },
    {
      header: "Fee",
      cell: (batch) => (
        <span className="font-medium text-slate-700">
          {batch.academicFee}
        </span>
      ),
    },
    {
      header: "Lectures",
      className: "w-[120px] text-center",
      cell: (batch) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-slate-200 hover:border-primary/30 hover:bg-primary/5 group transition-all duration-200 rounded-md shadow-sm"
                asChild
              >
                <Link to={`/dashboard/batches/${batch.id}/lectures`}>
                  <div className="flex items-center gap-2">
                    <Eye className="h-3.5 w-3.5 text-slate-500 group-hover:text-primary transition-colors" />
                    <span className="text-[12px] font-semibold text-slate-600 group-hover:text-primary transition-colors">
                      View
                    </span>
                  </div>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Batch Lectures</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      header: "Actions",
      className: "text-right w-[120px]",
      cell: (batch) => (
        <div className="flex justify-end gap-1.5 text-right">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
            <Pencil className="h-4 w-4 text-slate-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleDeleteClick(batch)}
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
            <h1 className="text-2xl font-bold text-slate-900">Manage Batches</h1>
            <p className="text-slate-500 mt-1">
              View and manage batches for your programs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Program Filter */}
            <div className="w-[180px]">
              <Select
                value={selectedProgramId}
                onValueChange={setSelectedProgramId}
                disabled={isProgramsLoading}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder={isProgramsLoading ? "Loading..." : "Select Program"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button asChild className="shadow-sm">
              <Link to={ROUTES.BATCHES_ADD}>
                <Plus className="h-4 w-4 mr-2" />
                Add Batch
              </Link>
            </Button>
          </div>
        </div>

        {/* Batches Table */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <DataTable
              columns={columns}
              data={batches}
              isLoading={isProfileLoading || isBatchesLoading || !hasBatchesLoaded}
            />

            {pagination && pagination.pages > 1 && (
              <div className="p-4 border-t border-border">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    <div className="flex items-center justify-center text-sm font-medium mx-4">
                      Page {currentPage} of {pagination.pages}
                    </div>

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < pagination.pages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage >= pagination.pages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Batch"
        itemName={batchToDelete?.name}
      />
    </DashboardLayout>
  );
};

export default Batches;
