import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Plus } from "lucide-react";

const Programs = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Programs</h1>
            <p className="text-muted-foreground mt-1">
              Manage academic programs and curricula
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Program
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Your Programs
            </CardTitle>
            <CardDescription>
              Create and manage academic programs for your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No programs added yet</p>
              <p className="text-sm mt-1">Add your first program to get started</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Programs;
