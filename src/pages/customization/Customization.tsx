
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Palette, Save, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/features/customization/hooks/useTheme";
import { useEffect, useState } from "react";
import { InstitutionTheme } from "@/features/customization/types/theme.types";

const Customization = () => {
  const { theme, isLoading, updateTheme, isUpdating } = useTheme();
  const [formData, setFormData] = useState<InstitutionTheme>({
    primary: "#0ea5e9",
    secondary: "#64748b",
    background: "#ffffff",
    foreground: "#171717",
    accent: "#f59e0b",
  });

  useEffect(() => {
    if (theme) {
      setFormData({
        primary: theme.primary,
        secondary: theme.secondary,
        background: theme.background,
        foreground: theme.foreground,
        accent: theme.accent,
      });
    }
  }, [theme]);

  const handleColorChange = (key: keyof InstitutionTheme, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(formData);
  };

  const handleReset = () => {
    if (theme) {
      setFormData({
        primary: theme.primary,
        secondary: theme.secondary,
        background: theme.background,
        foreground: theme.foreground,
        accent: theme.accent,
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customization</h1>
            <p className="text-muted-foreground mt-1">
              Personalize the look and feel of your institution
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize colors, branding, and themes for your institution dashboard and learner portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primary">Primary Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="primary"
                        type="color"
                        value={formData.primary}
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={formData.primary}
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Used for main buttons, links, and highlights</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="secondary">Secondary Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="secondary"
                        type="color"
                        value={formData.secondary}
                        onChange={(e) => handleColorChange("secondary", e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={formData.secondary}
                        onChange={(e) => handleColorChange("secondary", e.target.value)}
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Used for secondary actions and subtle elements</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="accent">Accent Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="accent"
                        type="color"
                        value={formData.accent}
                        onChange={(e) => handleColorChange("accent", e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={formData.accent}
                        onChange={(e) => handleColorChange("accent", e.target.value)}
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Used for alerts, badges, and alternative focus items</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="background">Background Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="background"
                        type="color"
                        value={formData.background}
                        onChange={(e) => handleColorChange("background", e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={formData.background}
                        onChange={(e) => handleColorChange("background", e.target.value)}
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Main background color of your portal</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="foreground">Foreground/Text Color</Label>
                    <div className="flex gap-3">
                      <Input
                        id="foreground"
                        type="color"
                        value={formData.foreground}
                        onChange={(e) => handleColorChange("foreground", e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={formData.foreground}
                        onChange={(e) => handleColorChange("foreground", e.target.value)}
                        className="flex-1"
                        placeholder="#000000"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Default text color for maximum readability</p>
                  </div>

                  <div className="mt-8 p-4 rounded-lg border bg-muted/50">
                    <h3 className="text-sm font-semibold mb-2">Preview</h3>
                    <div 
                      className="p-4 rounded-md shadow-sm space-y-2 border"
                      style={{ backgroundColor: formData.background, color: formData.foreground }}
                    >
                      <div className="font-bold">Sample Heading</div>
                      <div className="text-sm opacity-80">This is how your theme will look in action.</div>
                      <div className="flex gap-2 pt-2">
                        <div 
                          className="px-3 py-1 rounded text-xs text-white" 
                          style={{ backgroundColor: formData.primary }}
                        >
                          Primary
                        </div>
                        <div 
                          className="px-3 py-1 rounded text-xs text-white" 
                          style={{ backgroundColor: formData.secondary }}
                        >
                          Secondary
                        </div>
                        <div 
                          className="px-3 py-1 rounded text-xs text-white" 
                          style={{ backgroundColor: formData.accent }}
                        >
                          Accent
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t px-6 py-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                disabled={isUpdating}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Customization;
