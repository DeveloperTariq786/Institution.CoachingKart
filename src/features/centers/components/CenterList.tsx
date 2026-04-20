import { Center } from "../types/center";
import { CenterCard } from "./CenterCard";
import { Skeleton } from "@/components/ui/skeleton";

interface CenterListProps {
    centers: Center[];
    isLoading: boolean;
}

export const CenterList = ({ centers, isLoading }: CenterListProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-3 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                        <Skeleton className="h-32 w-full rounded-md" />
                        <div className="space-y-2 p-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-3 w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (centers.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium italic">No centers found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {centers.map((center) => (
                <CenterCard key={center.id} center={center} />
            ))}
        </div>
    );
};
