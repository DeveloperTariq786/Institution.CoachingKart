import { useState, createContext, useContext } from "react";
import DashboardSidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

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
            userName={userName}
          />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            userName={userName}
          />
        </div>

        {/* Main content */}
        <div className={cn(
          "transition-all duration-300 min-h-screen flex flex-col",
          collapsed ? "lg:pl-16" : "lg:pl-64"
        )}>
          {/* Floating Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed top-4 right-4 z-40 p-2 bg-white rounded-full shadow-lg border text-slate-600 hover:text-slate-900"
          >
            <Menu className="h-6 w-6" />
          </button>

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DashboardLayout;
