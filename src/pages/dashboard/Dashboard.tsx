import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/features/dashboard/components/StatsCard";
import RecentLectures from "@/features/dashboard/components/RecentLectures";
import dashboardService, { DashboardStats, RecentLecture } from "@/features/dashboard/services/dashboardService";
import { Users, BookOpen, GraduationCap, Layers, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useAuthStore from "@/core/store/auth.store";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLectures, setRecentLectures] = useState<RecentLecture[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, lecturesData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentLectures(10)
        ]);
        setStats(statsData);
        setRecentLectures(lecturesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout userName={user?.name || "User"}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Welcome back, {user?.name || "Admin"}
        </h1>
        <p className="text-muted-foreground mt-1.5 flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Here's a quick overview of your institute's activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-32 rounded-xl border bg-card animate-pulse shadow-sm" />
          ))
        ) : (
          <>
            <StatsCard
              title="Total Students"
              value={stats?.students.toString() || "0"}
              icon={Users}
              trend="up"
              color="blue"
            />
            <StatsCard
              title="Active Courses"
              value={stats?.courses.toString() || "0"}
              icon={BookOpen}
              trend="up"
              color="emerald"
            />
            <StatsCard
              title="Programs"
              value={stats?.programs.toString() || "0"}
              icon={Layers}
              trend="up"
              color="orange"
            />
            <StatsCard
              title="Total Batches"
              value={stats?.batches.toString() || "0"}
              icon={GraduationCap}
              trend="up"
              color="primary"
            />
          </>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-8">
        <RecentLectures lectures={recentLectures} loading={loading} />
        
        {/* Placeholder for future sections */}
        <div className="rounded-xl border bg-card/50 p-8 shadow-sm backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
             <Layers className="h-24 w-24" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            Institute Insight
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed text-sm">
            This dashboard provides a comprehensive overview of your institution's growth and active operations. 
            Monitor program performance, course engagement, and student enrollment trends in real-time.
            More analytical charts and detailed reports are coming soon.
          </p>
          <div className="mt-6 flex gap-3">
             <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary hover:text-white transition-all cursor-pointer">
                View Reports
             </div>
             <div className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-xs font-semibold hover:bg-border transition-all cursor-pointer">
                Manage Courses
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
