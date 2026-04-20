import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "@/components/profile/ProfileDropdown";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  userName?: string;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Spacer */}
      <div className="flex-1" />
    </header>
  );
};

export default DashboardHeader;
