import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, PanelLeftClose, PanelLeft, Building2, ChevronDown, List, MapPin, GraduationCap, UserCog, Layers, Users2, ClipboardList, FileText, Palette, Images, Book, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ROUTES } from "@/core/routes/paths";
import "./Sidebar.css";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  subItems?: { label: string; path: string; icon: React.ElementType }[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.DASHBOARD },
  { icon: Building2, label: "Institution Profile", path: ROUTES.INSTITUTION },
  {
    icon: BookOpen,
    label: "Academics",
    path: ROUTES.COURSES,
    subItems: [
      { label: "Courses", path: ROUTES.COURSES, icon: List },
      { label: "Programs", path: ROUTES.PROGRAMS, icon: Layers },
      { label: "Subjects", path: ROUTES.SUBJECTS, icon: Book },
      { label: "Batches", path: ROUTES.BATCHES, icon: ClipboardList },
    ]
  },
  {
    icon: Users,
    label: "Users",
    path: ROUTES.STUDENTS,
    subItems: [
      { label: "Admins", path: ROUTES.ADMINS, icon: UserCog },
      { label: "Students", path: ROUTES.STUDENTS, icon: GraduationCap },
      { label: "New Registrations", path: ROUTES.NEW_REGISTRATIONS, icon: ClipboardCheck },
      { label: "Faculties", path: ROUTES.FACULTY, icon: Users2 },
      
    ]
  },
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

  const getActiveMenu = () => {
    const activeItem = navItems.find(
      item => item.subItems?.some(sub => location.pathname === sub.path)
    );
    return activeItem?.label || null;
  };

  const [openMenu, setOpenMenu] = useState<string | null>(getActiveMenu);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const isMenuOpen = (label: string) => {
    const containsActiveRoute = navItems
      .find(item => item.label === label)
      ?.subItems?.some(sub => location.pathname === sub.path);
    return openMenu === label || containsActiveRoute;
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r bg-sidebar flex flex-col overflow-y-auto scrollbar-hide transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Header */}
      <div className={cn(
        "flex items-center h-16 border-b border-sidebar-border px-4",
        collapsed ? "justify-center" : "px-4"
      )}>
        {collapsed ? (
          <img
            src="/assets/icon-logo.png"
            alt="Logo"
            className="h-20 w-20 max-w-none object-contain z-10"
          />
        ) : (
          <img
            src="/assets/full-logo.webp"
            alt="Coachingkart"
            className="h-24 object-contain z-10"
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
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
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
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
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
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
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
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
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary",
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
