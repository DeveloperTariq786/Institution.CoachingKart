import { useState, createContext, useContext } from "react";
import DashboardSidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import ProfileDropdown from "@/components/profile/ProfileDropdown";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
}

// Context to share collapsed state with children
const SidebarContext = createContext<{ collapsed: boolean }>({ collapsed: false });

export const useSidebarState = () => useContext(SidebarContext);

const DashboardLayout = ({ children, userName }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <div className="min-h-screen bg-muted/30">
        {/* Mobile overlay */}
        <div className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )} onClick={() => setSidebarOpen(false)} />

        {/* Mobile sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <DashboardSidebar
            collapsed={false}
            onToggle={() => setSidebarOpen(false)}
          />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Main content */}
        <div className={cn(
          "transition-all duration-300 min-h-screen flex flex-col",
          collapsed ? "lg:pl-16" : "lg:pl-64"
        )}>
          {/* Top Header Bar - scrolls with the page */}
          <header className="flex h-16 w-full items-center justify-between gap-4 px-6 bg-background/80 backdrop-blur-sm border-b border-slate-100 transition-all duration-300">
            {/* Left section: mobile toggle + search */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all border border-slate-100 shadow-sm active:scale-95 shrink-0"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Search bar */}
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-10 pl-9 pr-9 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right section: Profile dropdown */}
            <div className="flex items-center gap-4 shrink-0">
              <ProfileDropdown userName={userName} />
            </div>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DashboardLayout;