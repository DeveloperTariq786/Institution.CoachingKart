import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Video, Book, User, Clock, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { useLectures } from "@/features/lectures/hooks/useLectures";
import { Lecture } from "@/features/lectures/types/lecture";
import { useSubjects } from "@/features/subjects/hooks/useSubjects";
import { useBatches } from "@/features/batches/hooks/useBatches";
import { useInstitutionProfile } from "@/features/Institution/hooks/useInstitutionProfile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LectureCard, LectureCardSkeleton } from "@/features/lectures/components/LectureCard";
import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Lectures = () => {
    const { batchId } = useParams<{ batchId?: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { profile } = useInstitutionProfile();
    const institutionId = profile?.id;

    const { lectures, isFetching, fetchLectures, deleteLecture, hasLoaded, pagination } = useLectures();

    // Get values from search params or defaults
    const selectedSubjectId = searchParams.get("subjectId") || "";
    const selectedBatchSubjectId = searchParams.get("batchSubjectId") || "";
    const currentPage = parseInt(searchParams.get("page") || "1");
    const limit = 5;

    // For non-batch view
    const { subjects, fetchSubjects, isLoading: isSubjectsLoading } = useSubjects();

    // For batch view
    const { batches, fetchBatches, isLoading: isBatchesLoading } = useBatches();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [lectureToDelete, setLectureToDelete] = useState<Lecture | null>(null);

    // Initial data fetch
    useEffect(() => {
        if (batchId) {
            if (institutionId) fetchBatches({ institutionId }, 1, 100);
        } else {
            fetchSubjects();
        }
    }, [batchId, institutionId, fetchBatches, fetchSubjects]);

    // Derived state for batch view
    const currentBatch = batches.find(b => b.id === batchId);
    const batchSubjects = currentBatch?.subjects || [];

    // Set default selections if none in URL
    useEffect(() => {
        if (batchId) {
            if (batchSubjects.length > 0 && !selectedBatchSubjectId) {
                setSearchParams(prev => {
                    prev.set("batchSubjectId", batchSubjects[0].batchSubjectId);
                    return prev;
                }, { replace: true });
            }
        } else {
            if (subjects.length > 0 && !selectedSubjectId) {
                setSearchParams(prev => {
                    prev.set("subjectId", subjects[0].id);
                    return prev;
                }, { replace: true });
            }
        }
    }, [batchId, batchSubjects, subjects, selectedBatchSubjectId, selectedSubjectId, setSearchParams, hasLoaded]);

    // Fetch lectures on selection or page change
    useEffect(() => {
        if (batchId) {
            if (selectedBatchSubjectId) {
                fetchLectures({
                    batchSubjectId: selectedBatchSubjectId,
                    page: currentPage,
                    limit
                });
            }
        } else {
            if (selectedSubjectId) {
                fetchLectures({
                    subjectId: selectedSubjectId,
                    page: currentPage,
                    limit
                });
            }
        }
    }, [batchId, selectedBatchSubjectId, selectedSubjectId, currentPage, fetchLectures]);

    const handleSubjectChange = (id: string) => {
        setSearchParams(prev => {
            prev.set("subjectId", id);
            prev.set("page", "1");
            return prev;
        });
    };

    const handleBatchSubjectChange = (id: string) => {
        setSearchParams(prev => {
            prev.set("batchSubjectId", id);
            prev.set("page", "1");
            return prev;
        });
    };

    const handlePageChange = (page: number) => {
        setSearchParams(prev => {
            prev.set("page", page.toString());
            return prev;
        });
    };

    const handleDeleteClick = (lecture: Lecture) => {
        setLectureToDelete(lecture);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (lectureToDelete) {
            await deleteLecture(lectureToDelete.id);
            setLectureToDelete(null);
        }
    };

    const handleEditClick = (lecture: Lecture) => {
        navigate(ROUTES.LECTURES_EDIT.replace(":lectureId", lecture.id.toString()), {
            state: {
                lecture,
                from: location.pathname + location.search
            }
        });
    };

    const isLoading = isFetching || !hasLoaded || isSubjectsLoading || (!!batchId && isBatchesLoading);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {batchId && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-all duration-200"
                                asChild
                            >
                                <Link to={ROUTES.BATCHES}>
                                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                                </Link>
                            </Button>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {batchId ? (currentBatch ? `${currentBatch.name} Lectures` : "Batch Lectures") : "Manage Lectures"}
                            </h1>
                            <p className="text-slate-500 mt-1">
                                {batchId ? "View and manage video lectures for this batch." : "Publish and organize video lectures for students."}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="w-[200px]">
                            {batchId ? (
                                <Select
                                    value={selectedBatchSubjectId}
                                    onValueChange={handleBatchSubjectChange}
                                    disabled={isBatchesLoading || batchSubjects.length === 0}
                                >
                                    <SelectTrigger className="bg-white border-slate-200">
                                        <SelectValue placeholder="Select Subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {batchSubjects.map((sb) => (
                                            <SelectItem key={sb.batchSubjectId} value={sb.batchSubjectId}>
                                                {sb.subject.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Select
                                    value={selectedSubjectId}
                                    onValueChange={handleSubjectChange}
                                    disabled={isSubjectsLoading}
                                >
                                    <SelectTrigger className="bg-white border-slate-200">
                                        <SelectValue placeholder="Select Subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem key={subject.id} value={subject.id}>
                                                {subject.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        <Button asChild className="shadow-sm">
                            <Link
                                to={ROUTES.LECTURES_ADD}
                                state={{
                                    from: location.pathname + location.search,
                                    batchId: batchId,
                                    batchSubjectId: selectedBatchSubjectId,
                                    subjectId: selectedSubjectId
                                }}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Lecture
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Lectures List */}
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <LectureCardSkeleton key={i} />
                        ))}
                    </div>
                ) : lectures.length === 0 ? (
                    <Card className="border-none shadow-sm bg-slate-50/50">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                            <Video className="h-12 w-12 text-slate-300 mb-4" />
                            <p className="font-medium text-slate-600">No lectures found.</p>
                            <p className="text-sm mt-1">Check back later or add a new lecture.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            {lectures.map((l) => (
                                <LectureCard
                                    key={l.id}
                                    lecture={l}
                                    onDelete={handleDeleteClick}
                                    onEdit={handleEditClick}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.pages > 1 && (
                            <div className="pt-4 pb-8">
                                <ShadcnPagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (currentPage > 1) handlePageChange(currentPage - 1);
                                                }}
                                                className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                                            />
                                        </PaginationItem>

                                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(page);
                                                    }}
                                                    isActive={currentPage === page}
                                                    className="cursor-pointer"
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (currentPage < pagination.pages) handlePageChange(currentPage + 1);
                                                }}
                                                className={cn("cursor-pointer", currentPage === pagination.pages && "pointer-events-none opacity-50")}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </ShadcnPagination>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
                title="Delete Lecture"
                itemName={lectureToDelete?.title}
            />
        </DashboardLayout>
    );
};

export default Lectures;
