import { GraduationCap } from "lucide-react";

interface ProgramRowInfoProps {
    name: string;
    courseName?: string;
}

export const ProgramRowInfo = ({ name, courseName }: ProgramRowInfoProps) => {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2 rounded-xl">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
                <span className="font-semibold text-slate-700 block">{name}</span>
                {courseName && (
                    <span className="text-xs text-slate-500">{courseName}</span>
                )}
            </div>
        </div>
    );
};
