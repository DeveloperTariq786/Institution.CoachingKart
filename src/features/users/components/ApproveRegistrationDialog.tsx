import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { InstitutionStudent } from "../types/user.types";
import { Calendar, CheckCircle2, GraduationCap, Layers, Loader2, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ApproveRegistrationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    registration: InstitutionStudent | null;
    onApprove: (payload: { setExpiry: boolean; expiresAt?: string }) => Promise<void>;
    isLoading?: boolean;
}

export function ApproveRegistrationDialog({
    open,
    onOpenChange,
    registration,
    onApprove,
    isLoading = false,
}: ApproveRegistrationDialogProps) {
    const [setExpiry, setSetExpiry] = useState(false);
    const [expiresAt, setExpiresAt] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setSetExpiry(false);
            setExpiresAt("");
            setError(null);
        }
    }, [open, registration?.id]);

    const handleApprove = async () => {
        if (setExpiry) {
            if (!expiresAt) {
                setError("Please select an expiry date.");
                return;
            }

            const expiryDate = new Date(expiresAt);
            if (expiryDate <= new Date()) {
                setError("Expiry date must be in the future.");
                return;
            }

            await onApprove({
                setExpiry: true,
                expiresAt: expiryDate.toISOString(),
            });
            return;
        }

        setError(null);
        await onApprove({ setExpiry: false });
    };

    if (!registration) return null;

    return (
        <Dialog open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
                <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent px-6 pt-6 pb-4">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl">Approve Registration</DialogTitle>
                                <DialogDescription className="mt-0.5">
                                    Confirm enrollment for this student
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="px-6 py-4 space-y-4">
                    <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <User className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">{registration.user.name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    {registration.user.email}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-1 text-sm">
                            <div className="flex items-start gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Course</p>
                                    <p className="font-medium">{registration.batch.program.course.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Layers className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Batch</p>
                                    <p className="font-medium">{registration.batch.name}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground border-t pt-3">
                            Registered on {format(new Date(registration.joinedAt), "dd MMM yyyy 'at' h:mm a")}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="set-expiry" className="text-sm font-medium">
                                    Set enrollment expiry
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    {setExpiry
                                        ? "Student access will expire on the selected date"
                                        : "No expiry — student access continues indefinitely"}
                                </p>
                            </div>
                            <Switch
                                id="set-expiry"
                                checked={setExpiry}
                                onCheckedChange={(checked) => {
                                    setSetExpiry(checked);
                                    setError(null);
                                    if (!checked) setExpiresAt("");
                                }}
                                disabled={isLoading}
                            />
                        </div>

                        {setExpiry && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                <Label htmlFor="expires-at" className="text-sm font-medium flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Expires At
                                </Label>
                                <Input
                                    id="expires-at"
                                    type="datetime-local"
                                    value={expiresAt}
                                    onChange={(e) => {
                                        setExpiresAt(e.target.value);
                                        setError(null);
                                    }}
                                    disabled={isLoading}
                                    min={new Date().toISOString().slice(0, 16)}
                                    className={cn(error && "border-destructive focus-visible:ring-destructive")}
                                />
                            </div>
                        )}

                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t bg-muted/20 sm:justify-between gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleApprove}
                        disabled={isLoading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Approving...
                            </span>
                        ) : (
                            <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
