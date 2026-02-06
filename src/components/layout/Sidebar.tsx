import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, PanelLeftClose, PanelLeft, Building2, ChevronDown, List, MapPin, GraduationCap, UserCog, Layers, Users2, ClipboardList, FileText, Palette, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ROUTES } from "@/core/routes/paths";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  subItems?: { label: string; path: string; icon: React.ElementType }[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.DASHBOARD },
  { icon: Building2, label: "Institution", path: ROUTES.INSTITUTION },
  {
    icon: BookOpen,
    label: "Courses",
    path: ROUTES.COURSES,
    subItems: [
      { label: "Manage Courses", path: ROUTES.COURSES, icon: List },
      { label: "Programs", path: ROUTES.PROGRAMS, icon: Layers },
      { label: "Batches", path: ROUTES.BATCHES, icon: ClipboardList },
    ]
  },
  {
    icon: Users,
    label: "Users",
    path: ROUTES.STUDENTS,
    subItems: [
      { label: "Students", path: ROUTES.STUDENTS, icon: GraduationCap },
      { label: "Admins", path: ROUTES.ADMINS, icon: UserCog },
    ]
  },
  { icon: Users2, label: "Faculty", path: ROUTES.FACULTY },
  { icon: MapPin, label: "Centers", path: ROUTES.CENTERS },
  { icon: FileText, label: "Results", path: ROUTES.RESULTS },
  { icon: Images, label: "Media", path: ROUTES.MEDIA },
  { icon: Palette, label: "Customization", path: ROUTES.CUSTOMIZATION },
];
interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();

  // Find which menu contains the current route
  const getActiveMenu = () => {
    const activeItem = navItems.find(
      item => item.subItems?.some(sub => location.pathname === sub.path)
    );
    return activeItem?.label || null;
  };

  const [openMenu, setOpenMenu] = useState<string | null>(getActiveMenu);

  const toggleMenu = (label: string) => {
    // Accordion behavior: close if already open, otherwise open this one (closing others)
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  // Keep the menu open if it contains the active route
  const isMenuOpen = (label: string) => {
    const containsActiveRoute = navItems
      .find(item => item.label === label)
      ?.subItems?.some(sub => location.pathname === sub.path);
    return openMenu === label || containsActiveRoute;
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r bg-card flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Header - matches main header height */}
      <div className={cn(
        "flex items-center h-16 border-b px-4",
        collapsed ? "justify-center" : "gap-2"
      )}>
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-primary shrink-0"
          fill="currentColor"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {!collapsed && (
          <span className="text-xl font-bold text-foreground">ClassConnect</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.subItems && item.subItems.some(sub => location.pathname === sub.path));
          const isOpen = isMenuOpen(item.label);

          if (item.subItems && !collapsed) {
            return (
              <Collapsible key={item.path} open={isOpen} onOpenChange={() => toggleMenu(item.label)}>
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all w-full",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180"
                    )} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 mt-1 space-y-1">
                  {item.subItems.map((subItem) => {
                    const isSubActive = location.pathname === subItem.path;
                    return (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                          isSubActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <subItem.icon className="h-4 w-4 shrink-0" />
                        {subItem.label}
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.subItems ? item.subItems[0].path : item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && !item.subItems && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle Button */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full justify-center",
            !collapsed && "justify-start"
          )}
        >
          {collapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <>
              <PanelLeftClose className="h-5 w-5 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
