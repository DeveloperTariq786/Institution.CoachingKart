export const COURSE_ICONS = [
    { value: "Science", label: "Science", url: "https://cdn-icons-png.flaticon.com/512/2541/2541988.png" },
    { value: "Medical", label: "Medical", url: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" },
    { value: "Book", label: "Book", url: "https://cdn-icons-png.flaticon.com/512/3330/3330300.png" },
    { value: "Graduation", label: "Graduation", url: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png" },
    { value: "Code", label: "Code", url: "https://cdn-icons-png.flaticon.com/512/1828/1828231.png" },
    { value: "Atom", label: "Atom", url: "https://cdn-icons-png.flaticon.com/512/2942/2942167.png" },
    { value: "Calculator", label: "Calculator", url: "https://cdn-icons-png.flaticon.com/512/897/897368.png" },
    { value: "Globe", label: "Globe", url: "https://cdn-icons-png.flaticon.com/512/616/616616.png" },
    { value: "Music", label: "Music", url: "https://cdn-icons-png.flaticon.com/512/3659/3659784.png" },
    { value: "Art", label: "Art", url: "https://cdn-icons-png.flaticon.com/512/1048/1048944.png" },
    { value: "Sports", label: "Sports", url: "https://cdn-icons-png.flaticon.com/512/857/857418.png" },
    { value: "Language", label: "Language", url: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png" },
    { value: "Computer", label: "Computer", url: "https://cdn-icons-png.flaticon.com/512/2004/2004580.png" },
    { value: "Rocket", label: "Rocket", url: "https://cdn-icons-png.flaticon.com/512/2909/2909710.png" },
    { value: "Brain", label: "Brain", url: "https://cdn-icons-png.flaticon.com/512/3304/3304567.png" },
    { value: "Target", label: "Target", url: "https://cdn-icons-png.flaticon.com/512/3207/3207593.png" },
    { value: "Trophy", label: "Trophy", url: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png" },
    { value: "Idea", label: "Idea", url: "https://cdn-icons-png.flaticon.com/512/3176/3176369.png" },
    { value: "Puzzle", label: "Puzzle", url: "https://cdn-icons-png.flaticon.com/512/1587/1587402.png" },
];

export const COURSE_COLORS = [
    { value: "Green", label: "Green", bg: "bg-green-500", lightBg: "bg-green-100", text: "text-green-700" },
    { value: "Rose", label: "Rose", bg: "bg-rose-500", lightBg: "bg-rose-100", text: "text-rose-700" },
    { value: "Amber", label: "Amber", bg: "bg-amber-500", lightBg: "bg-amber-100", text: "text-amber-700" },
    { value: "Blue", label: "Blue", bg: "bg-blue-500", lightBg: "bg-blue-100", text: "text-blue-700" },
    { value: "Purple", label: "Purple", bg: "bg-purple-500", lightBg: "bg-purple-100", text: "text-purple-700" },
    { value: "Cyan", label: "Cyan", bg: "bg-cyan-500", lightBg: "bg-cyan-100", text: "text-cyan-700" },
    { value: "Emerald", label: "Emerald", bg: "bg-emerald-500", lightBg: "bg-emerald-100", text: "text-emerald-700" },
    { value: "Fuchsia", label: "Fuchsia", bg: "bg-fuchsia-500", lightBg: "bg-fuchsia-100", text: "text-fuchsia-700" },
    { value: "Indigo", label: "Indigo", bg: "bg-indigo-500", lightBg: "bg-indigo-100", text: "text-indigo-700" },
    { value: "Lime", label: "Lime", bg: "bg-lime-500", lightBg: "bg-lime-100", text: "text-lime-700" },
    { value: "Pink", label: "Pink", bg: "bg-pink-500", lightBg: "bg-pink-100", text: "text-pink-700" },
    { value: "Sky", label: "Sky", bg: "bg-sky-500", lightBg: "bg-sky-100", text: "text-sky-700" },
];

export const ICON_MAP: Record<string, string> = COURSE_ICONS.reduce((acc, icon) => ({
    ...acc,
    [icon.value]: icon.url
}), {});

export const COLOR_MAP: Record<string, { bg: string, lightBg: string, text: string }> = COURSE_COLORS.reduce((acc, color) => ({
    ...acc,
    [color.value]: { bg: color.bg, lightBg: color.lightBg, text: color.text }
}), {});
