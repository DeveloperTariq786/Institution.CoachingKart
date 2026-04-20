import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Images, LayoutTemplate, Save, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DashboardLayout, { useSidebarState } from "@/components/layout/DashboardLayout";
import MediaGallery from "@/features/media/components/MediaGallery";
import MediaBanners from "@/features/media/components/MediaBanners";
import About from "@/features/media/components/About";
import { useGallery } from "@/features/media/hooks/useGallery";
import { useBanner } from "@/features/media/hooks/useBanner";
import { useAbout } from "@/features/media/hooks/useAbout";
import { UpdateAboutRequest } from "@/features/media/types";

const Media = () => {
    const { collapsed } = useSidebarState();
    const [searchParams, setSearchParams] = useSearchParams();

    // Tab state - initialized from URL or default to gallery
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "gallery");

    // Sync state with URL if it changes externally
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && tab !== activeTab) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setSearchParams({ tab: value });
    };

    // Gallery Section State
    const { gallery, isLoading: isGalleryLoading, deleteGalleryItem } = useGallery();

    // Banner Section State
    const { banners, isLoading: isBannerLoading, deleteBannerItem } = useBanner();

    // About Section State
    const { about, isLoading: isAboutLoading, updateAbout, isUpdating } = useAbout();
    const [aboutData, setAboutData] = useState<UpdateAboutRequest>({
        title: "",
        description: "",
        image: "",
        visionTitle: "Our Vision",
        visionContent: "",
        missionTitle: "Our Mission",
        missionContent: ""
    });

    // Update local state when fetched about data changes
    useEffect(() => {
        if (about) {
            setAboutData({
                title: about.title || "",
                description: about.description || "",
                image: about.image || "",
                visionTitle: about.visionTitle || "Our Vision",
                visionContent: about.visionContent || "",
                missionTitle: about.missionTitle || "Our Mission",
                missionContent: about.missionContent || ""
            });
        }
    }, [about]);

    const handleSave = async () => {
        if (activeTab === "about") {
            try {
                await updateAbout(aboutData);
            } catch (error) {
                // Error handled by hook
            }
        } else {
            toast.success("Media settings saved successfully!");
        }
    };

    // Gallery handlers
    const removeGalleryImage = async (id: string) => {
        await deleteGalleryItem(id);
    };

    // Banner handlers
    const removeBanner = async (id: string) => {
        await deleteBannerItem(id);
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

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
                        <div className="flex items-center justify-end">
                            <Button asChild className="h-9">
                                <Link to={ROUTES.MEDIA_GALLERY_ADD}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Gallery Images
                                </Link>
                            </Button>
                        </div>
                        <MediaGallery
                            gallery={gallery}
                            onRemove={removeGalleryImage}
                            isLoading={isGalleryLoading}
                        />
                    </TabsContent>

                    <TabsContent value="banners" className="space-y-6">
                        <div className="flex items-center justify-end">
                            <Button asChild className="h-9">
                                <Link to={ROUTES.MEDIA_BANNER_ADD}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Banners
                                </Link>
                            </Button>
                        </div>
                        <MediaBanners
                            banners={banners}
                            onRemove={removeBanner}
                            isLoading={isBannerLoading}
                        />
                    </TabsContent>

                    <TabsContent value="about" className="space-y-6">
                        <About
                            data={aboutData}
                            onChange={(updatedData: Partial<UpdateAboutRequest>) => 
                                setAboutData(prev => ({ ...prev, ...updatedData }))
                            }
                        />
                    </TabsContent>
                </Tabs>

                {/* Save Button - Only for About tab */}
                {activeTab === "about" && (
                    <div className="flex justify-end pb-6">
                        <Button
                            onClick={handleSave}
                            size="lg"
                            className="gap-2"
                            disabled={isUpdating || isAboutLoading}
                        >
                            {isUpdating ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Media;
