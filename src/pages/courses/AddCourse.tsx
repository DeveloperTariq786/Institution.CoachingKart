import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ROUTES } from "@/core/routes/paths";

const iconOptions = [
  { value: "heart", label: "Heart", url: "https://cdn-icons-png.flaticon.com/512/833/833472.png" },
  { value: "book", label: "Book", url: "https://cdn-icons-png.flaticon.com/512/3330/3330300.png" },
  { value: "graduation", label: "Graduation", url: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png" },
  { value: "code", label: "Code", url: "https://cdn-icons-png.flaticon.com/512/1828/1828231.png" },
  { value: "atom", label: "Atom", url: "https://cdn-icons-png.flaticon.com/512/2942/2942167.png" },
  { value: "stethoscope", label: "Medical", url: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" },
  { value: "calculator", label: "Calculator", url: "https://cdn-icons-png.flaticon.com/512/897/897368.png" },
  { value: "beaker", label: "Science", url: "https://cdn-icons-png.flaticon.com/512/2541/2541988.png" },
  { value: "globe", label: "Globe", url: "https://cdn-icons-png.flaticon.com/512/616/616616.png" },
  { value: "music", label: "Music", url: "https://cdn-icons-png.flaticon.com/512/3659/3659784.png" },
  { value: "art", label: "Art", url: "https://cdn-icons-png.flaticon.com/512/1048/1048944.png" },
  { value: "sports", label: "Sports", url: "https://cdn-icons-png.flaticon.com/512/857/857418.png" },
  { value: "language", label: "Language", url: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png" },
  { value: "computer", label: "Computer", url: "https://cdn-icons-png.flaticon.com/512/2004/2004580.png" },
  { value: "rocket", label: "Rocket", url: "https://cdn-icons-png.flaticon.com/512/2909/2909710.png" },
  { value: "brain", label: "Brain", url: "https://cdn-icons-png.flaticon.com/512/3304/3304567.png" },
  { value: "target", label: "Target", url: "https://cdn-icons-png.flaticon.com/512/3207/3207593.png" },
  { value: "trophy", label: "Trophy", url: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png" },
  { value: "lightbulb", label: "Idea", url: "https://cdn-icons-png.flaticon.com/512/3176/3176369.png" },
  { value: "puzzle", label: "Puzzle", url: "https://cdn-icons-png.flaticon.com/512/1587/1587402.png" },
];

const colorOptions = [
  { value: "rose", label: "Rose", bg: "bg-rose-50", text: "text-rose-500" },
  { value: "amber", label: "Amber", bg: "bg-amber-50", text: "text-amber-600" },
  { value: "blue", label: "Blue", bg: "bg-blue-50", text: "text-blue-500" },
  { value: "green", label: "Green", bg: "bg-green-50", text: "text-green-500" },
  { value: "purple", label: "Purple", bg: "bg-purple-50", text: "text-purple-500" },
  { value: "cyan", label: "Cyan", bg: "bg-cyan-50", text: "text-cyan-500" },
];

const AddCourse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    color: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.icon || !formData.color) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Course Created",
      description: `"${formData.name}" has been added successfully.`,
    });

    navigate(ROUTES.COURSES);
  };

  const selectedIcon = iconOptions.find((opt) => opt.value === formData.icon);
  const selectedColor = colorOptions.find((opt) => opt.value === formData.color);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to={ROUTES.COURSES}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Course</h1>
            <p className="text-muted-foreground">Create a new course for your institution</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Enter the basic information about the course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., NEET, IIT JEE, Pre Foundation"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon *</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData({ ...formData, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <img src={option.url} alt={option.label} className="h-4 w-4 object-contain" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color *</Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => setFormData({ ...formData, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div className={`h-4 w-4 rounded ${option.bg} border`} />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preview */}
              {selectedIcon && selectedColor && (
                <div className="pt-4 border-t">
                  <Label className="mb-3 block">Preview</Label>
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                    <div className={`${selectedColor.bg} p-3 rounded-full`}>
                      <img src={selectedIcon.url} alt={selectedIcon.label} className="h-6 w-6 object-contain" />
                    </div>
                    <h3 className="font-bold">{formData.name || "Course Name"}</h3>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link to={ROUTES.COURSES}>Cancel</Link>
            </Button>
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddCourse;
