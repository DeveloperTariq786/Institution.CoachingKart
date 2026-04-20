import { Users } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const BatchRowInfo = ({ name }: { name: string }) => {
    return (
        <div className="flex items-center gap-3 w-full overflow-hidden">
            <div className="bg-orange-50 p-2 rounded-xl shrink-0">
                <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <span className="font-semibold text-slate-700 block truncate cursor-help">
                            {name}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[300px] break-words">
                        <p>{name}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
};
