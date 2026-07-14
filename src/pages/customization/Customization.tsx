
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Palette, Save, RotateCcw, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/features/customization/hooks/useTheme";
import { useEffect, useState } from "react";
import { InstitutionTheme, PREDEFINED_PALETTES } from "@/features/customization/types/theme.types";
import { cn } from "@/lib/utils";

const Customization = () => {
  const { themes, activeTheme, isLoading, updateTheme, isUpdating } = useTheme();
  const [formData, setFormData] = useState<InstitutionTheme>({
    primary: "#0ea5e9",
    background: "#ffffff",
    foreground: "#171717",
  });

  useEffect(() => {
    if (activeTheme) {
      setFormData({
        primary: activeTheme.primary,
        background: activeTheme.background,
        foreground: activeTheme.foreground,
      });
    }
  }, [activeTheme]);

  const handlePaletteSelect = (palette: InstitutionTheme) => {
    setFormData(palette);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(formData);
  };

  const handleReset = () => {
    if (activeTheme) {
      setFormData({
        primary: activeTheme.primary,
        background: activeTheme.background,
        foreground: activeTheme.foreground,
      });
    }
  };

  const isSelected = (palette: InstitutionTheme) => {
    return (
      formData.primary === palette.primary &&
      formData.background === palette.background &&
      formData.foreground === palette.foreground
    );
  };

  const isActive = (palette: InstitutionTheme) => {
    if (!activeTheme) return false;
    return (
      activeTheme.primary === palette.primary &&
      activeTheme.background === palette.background &&
      activeTheme.foreground === palette.foreground
    );
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

  // Combine hardcoded palettes with API themes
  const allPalettes = [...PREDEFINED_PALETTES, ...themes];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customization</h1>
            <p className="text-muted-foreground mt-1">
              Personalize the look and feel of your institution with professional color palettes
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Select a Palette
                </CardTitle>
                <CardDescription>
                  Choose from our curated collection or your saved themes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => handlePaletteSelect(palette)}
                      className={cn(
                        "group relative flex flex-col gap-3 p-4 rounded-xl border-2 transition-all hover:border-primary/50 text-left",
                        isSelected(palette) ? "border-primary bg-primary/5 shadow-md" : "border-muted bg-card"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{palette.name}</span>
                          {isActive(palette) && (
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/20">
                              Current
                            </span>
                          )}
                        </div>
                        {isSelected(palette) && (
                          <div className="bg-primary rounded-full p-1">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex h-12 w-full rounded-md overflow-hidden border">
                        <div className="flex-[2]" style={{ backgroundColor: palette.primary }} title="Primary" />
                        <div className="flex-[3]" style={{ backgroundColor: palette.background }} title="Background" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit sticky top-6">
              <CardHeader>
                <CardTitle>Theme Preview</CardTitle>
                <CardDescription>How your Website will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-xl border shadow-sm space-y-4 transition-colors duration-300"
                  style={{ backgroundColor: formData.background, color: formData.foreground }}
                >
                  <div className="space-y-1">
                    <div className="h-2 w-12 rounded-full mb-2" style={{ backgroundColor: formData.primary }} />
                    <div className="text-2xl font-extrabold tracking-tight">Building <span style={{ color: formData.primary }}>Smart</span> Solutions</div>
                    <div className="text-[10px] opacity-70 leading-relaxed max-w-[200px]">
                      Leveraging cutting-edge technologies to create digital experiences that scale.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <div 
                      className="px-4 py-1.5 rounded text-[10px] font-bold text-white shadow-sm flex items-center gap-1 uppercase tracking-wider" 
                      style={{ backgroundColor: formData.primary }}
                    >
                      Get Started →
                    </div>
                    <div 
                      className="px-4 py-1.5 rounded text-[10px] font-bold opacity-80 uppercase tracking-wider" 
                      style={{ color: formData.foreground }}
                    >
                      View Work ↗
                    </div>
                  </div>

                  <div className="pt-4 border-t border-muted-foreground/10">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: formData.primary }} />
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 w-24 rounded-full bg-muted-foreground/20" />
                        <div className="h-1.5 w-16 rounded-full bg-muted-foreground/10" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Primary</span>
                    <span className="font-mono">{formData.primary}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Background</span>
                    <span className="font-mono">{formData.background}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Foreground</span>
                    <span className="font-mono">{formData.foreground}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 pt-2">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Apply Palette
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full text-muted-foreground"
                  onClick={handleReset}
                  disabled={isUpdating}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-2" />
                  Reset to Current
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Customization;
