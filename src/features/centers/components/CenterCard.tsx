import { Center } from "../types/center";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CenterCardProps {
    center: Center;
    onEdit: (center: Center) => void;
    onDelete: (center: Center) => void;
}

export const CenterCard = ({ center, onEdit, onDelete }: CenterCardProps) => {
    return (
        <Card className="group overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-lg">
            <div className="relative h-32 overflow-hidden">
                <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        type="button"
                        className="h-8 w-8 bg-white/95 hover:bg-white shadow-sm border border-slate-100 backdrop-blur-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(center);
                        }}
                    >
                        <Pencil className="h-3.5 w-3.5 text-slate-600" />
                    </Button>
                </div>
                <div className="absolute top-2 right-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        type="button"
                        className="h-8 w-8 bg-white/95 hover:bg-white text-destructive hover:text-destructive hover:bg-destructive/10 shadow-sm border border-slate-100 backdrop-blur-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(center);
                        }}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            <CardContent className="p-4 space-y-3">
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {center.name}
                </h3>

                <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 line-clamp-2">
                            {center.location?.address || "No address provided"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                        <p className="text-xs font-medium text-slate-700">
                            {center.phone}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
