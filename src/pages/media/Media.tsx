import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Images, LayoutTemplate, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DashboardLayout, { useSidebarState } from "@/components/layout/DashboardLayout";
import MediaGallery, { GalleryImage } from "@/features/media/components/MediaGallery";
import MediaBanners, { BannerItem } from "@/features/media/components/MediaBanners";
import About from "@/features/media/components/About";

const Media = () => {
    const { collapsed } = useSidebarState();

    // Banner Section State
    const [banners, setBanners] = useState<BannerItem[]>([
        {
            id: "1",
            image: "",
            heading: "Welcome to Excellence Academy",
            description: "Your journey to success starts here"
        }
    ]);

    // Gallery Section State
    const [gallery, setGallery] = useState<GalleryImage[]>([]);

    // About Section State
    const [aboutContent, setAboutContent] = useState("<p>Welcome to our institution. We are dedicated to providing quality education...</p>");

    const handleSave = () => {
        toast.success("Media settings saved successfully!");
    };

    // Banner handlers
    const handleBannerImageUpload = (bannerId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBanners(prev => prev.map(b =>
                    b.id === bannerId ? { ...b, image: reader.result as string } : b
                ));
            };
            reader.readAsDataURL(file);
        }
    };

    const addBanner = () => {
        const newBanner: BannerItem = {
            id: Date.now().toString(),
            image: "",
            heading: "",
            description: ""
        };
        setBanners(prev => [...prev, newBanner]);
    };

    const removeBanner = (id: string) => {
        setBanners(prev => prev.filter(b => b.id !== id));
    };

    const updateBanner = (id: string, field: keyof BannerItem, value: string) => {
        setBanners(prev => prev.map(b =>
            b.id === id ? { ...b, [field]: value } : b
        ));
    };

    // Gallery handlers
    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const newImage: GalleryImage = {
                        id: Date.now().toString() + Math.random(),
                        url: reader.result as string,
                        caption: file.name.replace(/\.[^/.]+$/, "")
                    };
                    setGallery(prev => [...prev, newImage]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeGalleryImage = (id: string) => {
        setGallery(prev => prev.filter(img => img.id !== id));
    };

    const updateGalleryCaption = (id: string, caption: string) => {
        setGallery(prev => prev.map(img =>
            img.id === id ? { ...img, caption } : img
        ));
    };

    return (
        <DashboardLayout>
            <div className={cn(
                "space-y-6 mx-auto transition-all duration-300",
                collapsed ? "max-w-6xl" : "max-w-5xl"
            )}>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Media Management</h1>
                    <p className="text-muted-foreground">Manage your institution's gallery, banner images, and about information.</p>
                </div>

                <Tabs defaultValue="gallery" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="gallery" className="gap-2">
                            <Images className="h-4 w-4" />
                            <span>Gallery</span>
                        </TabsTrigger>
                        <TabsTrigger value="banners" className="gap-2">
                            <LayoutTemplate className="h-4 w-4" />
                            <span>Banners</span>
                        </TabsTrigger>
                        <TabsTrigger value="about" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span>About</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="gallery" className="space-y-6">
                        <MediaGallery
                            gallery={gallery}
                            onUpload={handleGalleryUpload}
                            onRemove={removeGalleryImage}
                            onUpdateCaption={updateGalleryCaption}
                        />
                    </TabsContent>

                    <TabsContent value="banners" className="space-y-6">
                        <MediaBanners
                            banners={banners}
                            onImageUpload={handleBannerImageUpload}
                            onAdd={addBanner}
                            onRemove={removeBanner}
                            onUpdate={updateBanner}
                        />
                    </TabsContent>

                    <TabsContent value="about" className="space-y-6">
                        <About
                            content={aboutContent}
                            onChange={setAboutContent}
                        />
                    </TabsContent>
                </Tabs>

                {/* Save Button */}
                <div className="flex justify-end pb-6">
                    <Button onClick={handleSave} size="lg" className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Media;
