import { Button } from "@/components/ui/button";
import { Plus, FileText, Download, ExternalLink, Type, Link2 } from "lucide-react";
import { useEffect } from "react";
import { useResources } from "../hooks/useResources";
import { Skeleton } from "@/components/ui/skeleton";
import { Resource } from "../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";

interface ResourceListProps {
    lectureId: string;
}

export const ResourceList = ({ lectureId }: ResourceListProps) => {
    const { resources, isLoading, fetchResources, lastLectureId } = useResources();
    const navigate = useNavigate();

    useEffect(() => {
        if (lectureId) {
            fetchResources(lectureId);
        }
    }, [lectureId, fetchResources]);

    // Check if the current resources belong to the requested lecture
    const isChangingLecture = lastLectureId !== lectureId;

    const getResourceInfo = (resource: Resource) => {
        if (resource.fileUrl) {
            const fileName = resource.fileUrl.split('/').pop() || 'Document';
            return {
                title: fileName,
                subtitle: "File Resource",
                icon: <FileText className="w-5 h-5 text-orange-500" />,
                bgColor: "bg-orange-50",
                actionUrl: resource.fileUrl
            };
        }
        if (resource.textContent) {
            return {
                title: resource.textContent,
                subtitle: "Text Content",
                icon: <Type className="w-5 h-5 text-blue-500" />,
                bgColor: "bg-blue-50",
                actionUrl: null,
                isText: true
            };
        }
        if (resource.externalUrl) {
            try {
                const links = JSON.parse(resource.externalUrl);
                const firstLink = Array.isArray(links) ? links[0] : null;
                return {
                    title: firstLink?.textContent || 'External Link',
                    subtitle: firstLink?.externalUrl || 'External Resource',
                    icon: <Link2 className="w-5 h-5 text-green-500" />,
                    bgColor: "bg-green-50",
                    actionUrl: firstLink?.externalUrl
                };
            } catch (e) {
                return {
                    title: "External Link",
                    subtitle: "Resource Link",
                    icon: <ExternalLink className="w-5 h-5 text-green-500" />,
                    bgColor: "bg-green-50",
                    actionUrl: null
                };
            }
        }
        return {
            title: "Unknown Resource",
            subtitle: "Unspecified Type",
            icon: <FileText className="w-5 h-5 text-slate-400" />,
            bgColor: "bg-slate-50",
            actionUrl: null
        };
    };

    if ((isLoading && resources.length === 0) || isChangingLecture) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500"> Lecture Resources</h2>
                </div>
                <Button
                    className="bg-[#0c2340] hover:bg-[#0c2340]/90 shadow-sm"
                    onClick={() => navigate(ROUTES.LECTURE_RESOURCES_ADD.replace(':lectureId', lectureId))}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                </Button>
            </div>

            <div className="grid gap-4">
                {resources.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
                        <p className="text-slate-400">No resources found for this lecture.</p>
                    </div>
                ) : (
                    resources.map((resource) => {
                        const { title, subtitle, icon, bgColor, actionUrl, isText } = (getResourceInfo(resource) as any);
                        return (
                            <div key={resource.id} className="flex items-start justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        {icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-medium text-slate-900 ${isText ? 'line-clamp-2' : 'truncate'}`}>
                                            {title}
                                        </h3>
                                        <p className="text-xs text-slate-500 truncate">{subtitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    {actionUrl && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 text-slate-400 hover:text-slate-600"
                                            onClick={() => window.open(actionUrl, '_blank')}
                                        >
                                            {resource.fileUrl ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
