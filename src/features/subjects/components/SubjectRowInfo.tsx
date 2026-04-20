export const SubjectRowInfo = ({ name, icon }: { name: string; icon?: string }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-xl shrink-0">
                <img
                    src={icon || "https://cdn-icons-png.flaticon.com/512/3330/3330300.png"}
                    alt={name}
                    className="h-5 w-5 object-contain"
                />
            </div>
            <div>
                <span className="font-semibold text-slate-700">
                    {name}
                </span>
            </div>
        </div>
    );
};
