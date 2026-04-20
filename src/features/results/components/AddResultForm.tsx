import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { useResults } from "../hooks/useResults";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useStudents } from "@/features/users/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Trophy, User, BookOpen, Calendar, FileType, UploadCloud } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CreateResultRequest } from "../types";

export const AddResultForm = () => {
    const navigate = useNavigate();
    const { createResults, isLoading } = useResults();
    const { courses, fetchCourses } = useCourses();
    const { students, refetch: fetchStudents } = useStudents(1, 100);

    const [entries, setEntries] = useState<{
        data: CreateResultRequest;
        profile: File | null;
        preview: string;
    }[]>([
        {
            data: { courseId: "", enrollmentId: "", rank: "", score: "", session: new Date().getFullYear().toString() },
            profile: null,
            preview: "",
        }
    ]);

    useEffect(() => {
        fetchCourses();
        fetchStudents();
    }, [fetchCourses, fetchStudents]);

    const addEntry = () => {
        setEntries([
            ...entries,
            {
                data: { courseId: "", enrollmentId: "", rank: "", score: "", session: new Date().getFullYear().toString() },
                profile: null,
                preview: "",
            }
        ]);
    };

    const removeEntry = (index: number) => {
        if (entries.length > 1) {
            setEntries(entries.filter((_, i) => i !== index));
        }
    };

    const updateEntry = (index: number, field: keyof CreateResultRequest, value: string) => {
        const newEntries = [...entries];
        newEntries[index].data = { ...newEntries[index].data, [field]: value };
        setEntries(newEntries);
    };

    const handleFileChange = (index: number, file: File | null) => {
        const newEntries = [...entries];
        if (file) {
            newEntries[index].profile = file;
            newEntries[index].preview = URL.createObjectURL(file);
        } else {
            newEntries[index].profile = null;
            newEntries[index].preview = "";
        }
        setEntries(newEntries);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const results = entries.map(e => e.data);
        const profiles = entries.map(e => e.profile).filter((p): p is File => p !== null);

        if (profiles.length !== results.length) {
            alert("Please upload a profile image for each result.");
            return;
        }

        const success = await createResults({ results, profiles });
        if (success) {
            navigate(ROUTES.RESULTS);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Add Student Achievements</h1>
                    <p className="text-muted-foreground">Add and manage student Achievements, Ranks, and Scores.</p>
                </div>
                <Button onClick={addEntry} variant="outline" className="gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                    <Plus className="h-4 w-4" />
                    Add More
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {entries.map((entry, index) => (
                        <Card key={index} className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Profile Upload Section */}
                                    <div className="flex-shrink-0">
                                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Student Photo</Label>
                                        <div className="relative group/photo">
                                            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border group-hover:border-primary/50 transition-colors bg-muted/30 flex flex-col items-center justify-center overflow-hidden">
                                                {entry.preview ? (
                                                    <img src={entry.preview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                                        <UploadCloud className="h-8 w-8 opacity-40" />
                                                        <span className="text-[10px] text-center px-2">Upload image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                                                required
                                            />
                                            {entry.preview && (
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-xs font-medium">Change Photo</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Fields Section */}
                                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-slate-600">Course</Label>
                                            <div className="relative">
                                                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Select value={entry.data.courseId} onValueChange={(v) => updateEntry(index, "courseId", v)} required>
                                                    <SelectTrigger className="pl-10 h-10">
                                                        <SelectValue placeholder="Select Course" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {courses?.map(c => (
                                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-slate-600">Student</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Select value={entry.data.enrollmentId} onValueChange={(v) => updateEntry(index, "enrollmentId", v)} required>
                                                    <SelectTrigger className="pl-10 h-10">
                                                        <SelectValue placeholder="Select Student" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {students?.map(s => (
                                                            <SelectItem key={s.id} value={s.id}>{s.user.name} ({s.batch.name})</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-slate-600">Session</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    className="pl-10"
                                                    placeholder="e.g. 2024"
                                                    value={entry.data.session}
                                                    onChange={(e) => updateEntry(index, "session", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-slate-600">Rank</Label>
                                            <div className="relative">
                                                <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    className="pl-10"
                                                    placeholder="e.g. 1"
                                                    value={entry.data.rank}
                                                    onChange={(e) => updateEntry(index, "rank", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold text-slate-600">Score</Label>
                                            <div className="relative">
                                                <FileType className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    className="pl-10"
                                                    placeholder="e.g. 600/720"
                                                    value={entry.data.score}
                                                    onChange={(e) => updateEntry(index, "score", e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-end">
                                            {entries.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10 h-10 w-10"
                                                    onClick={() => removeEntry(index)}
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="ghost" onClick={() => navigate(ROUTES.RESULTS)} disabled={isLoading}>
                        Back
                    </Button>
                    <Button type="submit" className="min-w-[150px] shadow-lg shadow-primary/20" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Uploading {entries.length} Result(s)...
                            </div>
                        ) : (
                            `Submit ${entries.length} Result(s)`
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};
