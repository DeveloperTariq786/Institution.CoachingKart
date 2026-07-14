import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Video, Book, User } from "lucide-react";
import { Lecture } from "../types/lecture";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

interface LectureCardProps {
    lecture: Lecture;
    onEdit?: (lecture: Lecture) => void;
    onDelete?: (lecture: Lecture) => void;
}

const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const LectureCard = ({ lecture, onEdit, onDelete }: LectureCardProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = () => {
        navigate(ROUTES.LECTURE_RESOURCES.replace(":lectureId", lecture.id.toString()), {
            state: { from: location.pathname + location.search }
        });
    };

    return (
        <Card 
            className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl bg-white ring-1 ring-slate-100 cursor-pointer"
            onClick={handleCardClick}
        >
            <CardContent className="p-3 flex flex-col sm:flex-row gap-4">
                {/* Thumbnail */}
                <div className="relative w-full sm:w-[220px] shrink-0 rounded-lg overflow-hidden aspect-video bg-slate-900 border border-slate-100">
                    {lecture.thumbnail ? (
                        <img
                            src={resolveAssetUrl(lecture.thumbnail)}
                            alt={lecture.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Video className="h-8 w-8 text-slate-500" />
                        </div>
                    )}
                    {/* Duration Overlay */}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[11px] font-semibold text-white tracking-wide backdrop-blur-sm">
                        {formatDuration(lecture.duration)}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 py-1">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-[17px] font-bold text-[#0c2340] leading-tight line-clamp-1">
                                {lecture.title}
                            </h3>
                            {lecture.description && (
                                <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed">
                                    {lecture.description}
                                </p>
                            )}
                        </div>
                        {/* Actions */}
                        <div className="flex flex-col items-center gap-1 shrink-0">
                            {onEdit && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-slate-100 text-slate-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(lecture);
                                    }}
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(lecture);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto pt-3 flex items-center gap-5">
                        {/* Faculty */}
                        <div className="flex items-center gap-2">
                            {lecture.faculty?.profileImage ? (
                                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-slate-200">
                                    <img
                                        src={resolveAssetUrl(lecture.faculty.profileImage)}
                                        alt={lecture.faculty.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <User className="w-4 h-4 text-slate-300" strokeWidth={2.5} />
                            )}
                            <span className="text-[13px] font-semibold text-[#8a9bb3] uppercase tracking-wider">
                                {lecture.faculty?.name || "FACULTY"}
                            </span>
                        </div>

                        {/* Resources */}
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500">
                            <Book className="w-3.5 h-3.5" />
                            <span>{lecture._count?.resources || 0} Resources</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const LectureCardSkeleton = () => {
    return (
        <Card className="overflow-hidden border-none shadow-sm rounded-xl bg-white ring-1 ring-slate-100">
            <CardContent className="p-3 flex flex-col sm:flex-row gap-4">
                {/* Thumbnail Skeleton */}
                <Skeleton className="w-full sm:w-[220px] rounded-lg aspect-video shrink-0 bg-slate-100" />

                {/* Content Skeleton */}
                <div className="flex flex-col flex-1 py-1 space-y-3">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-3/4 bg-slate-100" />
                        <Skeleton className="h-3.5 w-full bg-slate-100" />
                        <Skeleton className="h-3.5 w-5/6 bg-slate-100" />
                    </div>

                    <div className="mt-auto pt-3 flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5 rounded-full bg-slate-100" />
                            <Skeleton className="h-3.5 w-24 bg-slate-100" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Skeleton className="h-3.5 w-3.5 bg-slate-100" />
                            <Skeleton className="h-3.5 w-20 bg-slate-100" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
