import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Mail, Shield } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/core/store/auth.store";
import { ROUTES } from "@/core/routes/paths";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";

interface ProfileDropdownProps {
    userName?: string;
}

export const ProfileDropdown = ({ userName }: ProfileDropdownProps) => {
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const navigate = useNavigate();
    const { user, role, logout } = useAuthStore();

    const initials = userName || user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
        setShowLogoutDialog(false);
    };

    const formatRole = (roleStr: string | null) => {
        if (!roleStr) return "User";
        return roleStr.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity border-2 border-primary/20 shadow-sm">
                        <span className="text-sm font-bold tracking-tight">{initials}</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 shadow-2xl border-border bg-card">
                    <DropdownMenuLabel className="font-normal p-3">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-bold leading-none text-foreground line-clamp-1 font-manrope">{user?.name || "User"}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                <span className="line-clamp-1">{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-md self-start border border-primary/20 uppercase tracking-wider">
                                <Shield className="h-3 w-3" />
                                {formatRole(role)}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer py-2.5 rounded-md transition-colors"
                        onClick={() => setShowLogoutDialog(true)}
                    >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="font-medium">Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteConfirmDialog
                open={showLogoutDialog}
                onOpenChange={setShowLogoutDialog}
                onConfirm={handleLogout}
                title="Sign Out"
                description="Are you sure you want to sign out? You will need to sign in again to access your dashboard and manage your institution."
                confirmLabel="Sign Out"
                cancelLabel="Stay Signed In"
            />
        </>
    );
};

export default ProfileDropdown;
