import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/features/dashboard/components/StatsCard";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout userName="JD">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to your dashboard overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Students"
          value="2,350"
          change="+180.1%"
          changeLabel="from last month"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Active Courses"
          value="48"
          change="+12"
          changeLabel="new this month"
          icon={BookOpen}
          trend="up"
        />
        <StatsCard
          title="Enrollments"
          value="+12,234"
          change="+19%"
          changeLabel="from last month"
          icon={GraduationCap}
          trend="up"
        />
        <StatsCard
          title="Revenue"
          value="$45,231"
          change="+20.1%"
          changeLabel="from last month"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Overview Section */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
        <p className="text-muted-foreground">
          This is the dashboard page. Here you can see an overview of your institute's key metrics and data.
          Manage your students, courses, and track enrollment progress all in one place.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
