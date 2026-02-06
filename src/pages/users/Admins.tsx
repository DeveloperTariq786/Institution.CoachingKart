import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Plus } from "lucide-react";
import { useAdmins } from "@/features/users/hooks/useUsers";
import { AdminsTable } from "@/features/users/components/AdminsTable";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";

const Admins = () => {
  const { admins, isLoading } = useAdmins();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admins</h1>
            <p className="text-muted-foreground mt-1">
              View and manage administrator accounts
            </p>
          </div>
          <Button onClick={() => navigate(ROUTES.ADMINS_ADD)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <AdminsTable admins={admins || []} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Admins;
