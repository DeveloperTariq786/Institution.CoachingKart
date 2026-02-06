import { useState, createContext, useContext } from "react";
import DashboardSidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { cn } from "@/lib/utils";

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
          <DashboardSidebar collapsed={false} onToggle={() => setSidebarOpen(false)} />
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        </div>

        {/* Main content */}
        <div className={cn(
          "transition-all duration-300",
          collapsed ? "lg:pl-16" : "lg:pl-64"
        )}>
          <DashboardHeader
            onMenuClick={() => setSidebarOpen(true)}
            userName={userName}
          />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DashboardLayout;
