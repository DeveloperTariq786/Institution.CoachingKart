
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users2, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Faculty = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Faculty</h1>
            <p className="text-muted-foreground mt-1">
              Manage teachers and instructors
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty Member
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users2 className="h-5 w-5" />
              Faculty Members
            </CardTitle>
            <CardDescription>
              Add and manage your institution's teaching staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Users2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No faculty members added yet</p>
              <p className="text-sm mt-1">Add your first faculty member to get started</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Faculty;
