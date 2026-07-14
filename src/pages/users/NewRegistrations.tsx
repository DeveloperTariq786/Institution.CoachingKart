import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { NewRegistrationsTable } from "@/features/users/components/NewRegistrationsTable";
import { useUnapprovedRegistrations } from "@/features/users/hooks/useUsers";

const NewRegistrations = () => {
  const { registrations, isLoading, approveRegistration, isApproving } = useUnapprovedRegistrations();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">New Registrations</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage pending student registration requests
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <NewRegistrationsTable
              registrations={registrations || []}
              isLoading={isLoading}
              onApprove={(enrollmentId, payload) => approveRegistration({ enrollmentId, payload })}
              isApproving={isApproving}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewRegistrations;
