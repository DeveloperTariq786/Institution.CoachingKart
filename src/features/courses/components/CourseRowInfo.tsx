import { COURSE_COLORS } from "@/constants/courses";

interface CourseRowInfoProps {
    name: string;
    icon: string;
    color: string;
}

export const CourseRowInfo = ({ name, icon, color }: CourseRowInfoProps) => {
    // Find the color config by matching the bg class
    const colorTheme = COURSE_COLORS.find(c => c.bg === color) || 
        { bg: "bg-slate-500", lightBg: "bg-slate-100", text: "text-slate-700" };

    return (
        <div className="flex items-center gap-3">
            <div className={`${colorTheme.lightBg} p-2 rounded-xl`}>
                <img
                    src={icon}
                    alt={name}
                    className="h-5 w-5 object-contain"
                />
            </div>
            <span className="font-semibold text-slate-700">{name}</span>
        </div>
    );
};
