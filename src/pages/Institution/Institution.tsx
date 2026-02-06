import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import DashboardLayout, { useSidebarState } from "@/components/layout/DashboardLayout";
import InstitutionProfileForm from "@/features/Institution/components/InstitutionProfileForm";
import { useInstitutionProfile } from "@/features/Institution/hooks/useInstitutionProfile";
import Loader from "@/components/common/Loader";

const Institution = () => {
  const { collapsed } = useSidebarState();
  const { profile, isUpdating, updateProfile, isLoading } = useInstitutionProfile();

  return (
    <DashboardLayout>
      <div className={cn(
        "space-y-6 mx-auto transition-all duration-300",
        collapsed ? "max-w-6xl" : "max-w-5xl"
      )}>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Institution Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your institution's public information</p>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              {isLoading || !profile ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="md:col-span-2 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <Skeleton className="h-32 w-32 rounded-lg" />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <Skeleton className="h-48 w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              ) : (
                <InstitutionProfileForm
                  key={profile.id}
                  initialData={profile}
                  onSubmit={updateProfile}
                  isLoading={isUpdating}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Institution;
