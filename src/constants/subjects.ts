export const SUBJECT_ICONS = [
    { value: "Book", label: "Book", url: "https://cdn-icons-png.flaticon.com/512/3330/3330300.png" },
    { value: "Atom", label: "Atom", url: "https://cdn-icons-png.flaticon.com/512/2942/2942167.png" },
    { value: "FlaskConical", label: "Flask", url: "https://cdn-icons-png.flaticon.com/512/3050/3050159.png" },
    { value: "Calculator", label: "Calculator", url: "https://cdn-icons-png.flaticon.com/512/897/897368.png" },
    { value: "Globe", label: "Globe", url: "https://cdn-icons-png.flaticon.com/512/616/616616.png" },
    { value: "Lightbulb", label: "Lightbulb", url: "https://cdn-icons-png.flaticon.com/512/3176/3176369.png" },
    { value: "MusicNote", label: "Music Note", url: "https://cdn-icons-png.flaticon.com/512/727/727218.png" },
    { value: "Palette", label: "Palette", url: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
    { value: "Pencil", label: "Pencil", url: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png" },
    { value: "Heart", label: "Heart", url: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png" },
];

export const ICON_MAP: Record<string, string> = SUBJECT_ICONS.reduce((acc, icon) => ({
    ...acc,
    [icon.value]: icon.url
}), {});
