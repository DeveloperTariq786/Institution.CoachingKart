import { ICON_MAP, COLOR_MAP } from "@/constants/courses";

interface CoursePreviewProps {
    name: string;
    icon: string;
    color: string;
}

export const CoursePreview = ({ name, icon, color }: CoursePreviewProps) => {
    const selectedIconUrl = ICON_MAP[icon];
    const colorTheme = COLOR_MAP[color] || { lightBg: "bg-slate-100", text: "text-slate-700" };

    if (!name && !icon && !color) return null;

    return (
        <div className="mt-8 pt-8 border-t border-slate-100">
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Preview</h4>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className={`${colorTheme.lightBg} p-3 rounded-xl`}>
                    <img
                        src={selectedIconUrl || ICON_MAP.Book}
                        alt={icon}
                        className="h-6 w-6 object-contain"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">{name || "Course Name"}</h3>
                    <p className="text-sm text-slate-500">{color || "Default"} Theme</p>
                </div>
            </div>
        </div>
    );
};
